---
theme: dashboard
toc: false
---
```
import {Plot} from "@mkfreeman/plot-tooltip"
```

# Chart

```js
const businesses = FileAttachment("./data/datachart.csv").csv()
```
```js
display(businesses);
```
```js
const years = Array.from({ length: 6}, (_, i) => (2017 + i).toString());
```

```js
const industryDropdown = Inputs.select(
  [...new Set(businesses.map(b => b["NAICS Description"]))],
  { label: "Pick an industry" }
)
```
```js
display(industryDropdown)
```

```js
// obtaining the year based on the License Start Date of each business
function getYear(business) {
  return business["License Start Date"].substring(0, 4);
}
```
```js
//sort each business by the industry the business serves
function filterByIndustry(industry) {
  return businesses.filter(b => b["NAICS Description"] === industry);
}
```
```js
// Count businesses by year for the selected industry
function countBusinessesByYear(industry) {
  const filtered = filterByIndustry(industry);
  const counts = {};

  for (let year = 2017; year <= 2022; year++) {
    counts[year.toString()] = filtered.filter(b => getYear(b) === year.toString()).length;
  }

  return counts;
}
```
```js

// Function to render the chart
function renderChart(industry, {width} = {}) {
  const businessCounts = countBusinessesByYear(industry);
  const data = Object.entries(businessCounts).map(([year, count]) => ({
    year,
    count: +count
  }));

  // Debugging: Check the data being passed to the chart
  console.log(data);

  // Clear previous chart
  const chartContainer = document.getElementById('chart');
  chartContainer.innerHTML = '';

  // Render new chart
  const chart =

  Plot.plot({
    marks: [
      Plot.barY(data, { x: "year", y: "count", fill: "salmon" }),
      Plot.ruleY([0]),
      Plot.tip(data, {
        x: "year",
        y: "count",
        title: d => `Year: ${d.year}\nBusinesses: ${d.count}`,
        style: {
          fontSize: '100px',   // Customize font size
          padding: '10px',     // Customize padding
          maxWidth: '100px',  // Set a max width
          backgroundColor: '#333', // Background color
          color: '#fff',      // Text color
          borderRadius: '4px', // Rounded corners
          border: '1px solid #ddd' // Border styling
        }
      })
    ],
    x: {
      label: "Year"
    },
    y: {
      label: "Number of Businesses"
    },
    width,
    height: 400,
    marginTop: 50,
    marginBottom: 80,
    marginLeft: 80,
  });

  chartContainer.appendChild(chart);
}

// Initial render
renderChart(industryDropdown.value);

// Update chart on dropdown change
industryDropdown.addEventListener('change', () => {
  renderChart(industryDropdown.value);
});

```


<div class="card" style="display: flex; flex-direction: column; gap: 1rem;">
  ${industryDropdown}
</div>
