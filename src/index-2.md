---
title: chart
---
# hi




```js echo
// attachment of different businesses within the Seattle region.
businesses = FileAttachment("Active_Business_License_Tax_Certificate_20240711@1.csv").csv()
```

```js echo
//the different years (from the year 2017 to the year 2022)
years = Array.from({ length: 6}, (_, i) => (2017 + i).toString());
```

```js echo
// dropdown menu showcasing the different industries present within the city proper.
// via each of the NAICS Description within the businesses data.
viewof industryDropdown = Inputs.select(
  [...new Set(businesses.map(b => b["NAICS Description"]))],
  { label: "Pick an industry" }
)
```

```js echo
// obtaining the year based on the License Start Date of each business
function getYear(business) {
  return business["License Start Date"].substring(0, 4);
}
```

```js echo
//sort each business by the industry the business serves
function filterByIndustry(industry) {
  return businesses.filter(b => b["NAICS Description"] === industry);
}
```

```js echo
// Count businesses by year for the selected industry
function countBusinessesByYear(industry) {
  const filtered = filterByIndustry(industry);
  const counts = {};

  //making sure the year of the business was in is equivalent to the string version of the year that we currently have.
  for (let year = 2017; year <= 2022; year++) {
    counts[year.toString()] = filtered.filter(b => getYear(b) === year.toString()).length;
  }

  return counts;
}
```

```js echo
// Plotting the bar graph
Plot.plot({
  label: null,
  marks: [
    Plot.barY(Object.entries(countBusinessesByYear(industryDropdown)), { x: "0", y: "1" , fill: "salmon"})
  ],
  // x axis
  x: {
    label: "Year",
    //values: ["2017", "2018", "2019", "2020", "2021", "2022"]
  },
  // y axis
  y: {
    label: "Number of Businesses"
  },
  width: 800,
  height: 400,
  marginTop: 50,
  marginBottom: 80,
  marginLeft: 80,
  fill: {value: "salmon"},
})
```



