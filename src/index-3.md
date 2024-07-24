---
theme: dashboard
toc: false
---
# Chart

```js
display(industryDropdown)
```

<p><b>Businesses</b> are considered to be a driving force behind Seattle's rapid growth. However,perhaps surprisingly,the total number of businesses has not chnaged dramatically within the decade. Shown above is a chart containing the number of active business license
certificates within the city limits from 2017 to 2022
respectively.
</p>

<p>To interact with the visualization, please select different sectors by using the dropdown menu below the bar chart.
</p>



```js
const businesses = FileAttachment("./data/datachart.csv").csv()
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
      })
    ],
    x: {
      label: "Year"
    },
    y: {
      label: "Number of Businesses"
    },
    width: 800,
    height: 800,
    marginTop: 90,
    marginBottom: 80,
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




