document.addEventListener('DOMContentLoaded', function() {
  const csvUrl = './data/Active_Business_License_Tax_Certificate_20240711.csv'; // Path to your CSV file
  const years = ["2017", "2018", "2019", "2020", "2021", "2022"];

  let businesses = [];

  // Fetch and parse CSV manually
  fetch(csvUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.text();
      })
      .then(data => {
          businesses = parseCSV(data);
          console.log('Parsed CSV data:', businesses); // Log data to verify
          if (businesses.length === 0) {
              console.error('No data found in the CSV file.');
              return;
          }
          initializeDropdown();
      })
      .catch(error => {
          console.error('Error fetching the CSV file:', error);
      });

  function parseCSV(data) {
      const lines = data.trim().split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      const rows = lines.slice(1).map(line => line.split(',').map(value => value.trim()));

      // Convert rows to objects using headers
      return rows.map(row => {
          return headers.reduce((obj, header, index) => {
              obj[header] = row[index];
              return obj;
          }, {});
      }).filter(row => row["NAICS Description"] && row["License Start Date"]); // Filter out any rows with missing important data
  }

  function getYear(business) {
      return business["License Start Date"] ? business["License Start Date"].substring(0, 4) : '';
  }

  function filterByIndustry(industry) {
      return businesses.filter(b => b["NAICS Description"] === industry);
  }

  function countBusinessesByYear(industry) {
      const filtered = filterByIndustry(industry);
      const counts = {};

      for (let year of years) {
          counts[year] = filtered.filter(b => getYear(b) === year).length;
      }

      return counts;
  }

  function initializeDropdown() {
      const industryDropdown = document.getElementById('industryDropdown');
      const industries = [...new Set(businesses.map(b => b["NAICS Description"]))];

      console.log('Industries found:', industries); // Log industries for debugging

      if (industries.length === 0) {
          console.error('No industries found in the CSV data.');
          return;
      }

      industries.forEach(industry => {
          const option = document.createElement('option');
          option.value = industry;
          option.textContent = industry;
          industryDropdown.appendChild(option);
      });

      // Set initial value and update chart
      if (industries.length > 0) {
          industryDropdown.value = industries[0];
          initializeChart();
          industryDropdown.addEventListener('change', function() {
              updateChart(industryDropdown.value);
          });
      } else {
          console.error('No options to select.');
      }
  }

  function initializeChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      const initialIndustry = document.getElementById('industryDropdown').value;
      window.chart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: years,
              datasets: [{
                  label: 'Number of Businesses',
                  data: Object.values(countBusinessesByYear(initialIndustry)),
                  backgroundColor: 'salmon',
              }]
          },
          options: {
              scales: {
                  x: {
                      title: {
                          display: true,
                          text: 'Year'
                      }
                  },
                  y: {
                      title: {
                          display: true,
                          text: 'Number of Businesses'
                      }
                  }
              }
          }
      });
  }

  function updateChart(industry) {
      if (window.chart) {
          window.chart.data.datasets[0].data = Object.values(countBusinessesByYear(industry));
          window.chart.update();
      }
  }
});
