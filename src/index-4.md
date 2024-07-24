# Map of Seattle With Zipcodes

<p><b>Seattle is a big and diverse city.</b> The number of businesses may be increasing steadily over the years, but the increaseis not uniformly distributed throughout the city.
</p>

<p>
This map shows the distribution of businesses by ZIP code
from 2017 to 2022. It provides a more informative viewpoint of the distribution of businesses with an active business license
certificate. Also, the map includes the city of Shoreline
as the ZIP codes 98177 98133, and 98155 cover both Seattle and Shoreline. A part of the city of Tukwila is shown as the ZIP code 98168 encompasses both Seattle and Tukwila.
</p>

```js
const businesses = await FileAttachment("./data/Active_Business_License_Tax_Certificate_20240711@1.csv").csv();
```

```js
const curr_sea_dist_raw = await FileAttachment("./data/zip-codes.geojson").json();
```

```js
const years = Array.from({length: 6}, (_,i) => (2017 + i).toString());
```

```js
const yearDropdown = Inputs.select(years, {label: "Pick a year"});
```

```js
display(yearDropdown);
```

```js
// Assuming voronoiMap2 function definition
const voronoiMap2 = () => {
  // Define color scheme and default styles for the map
  let ordinalRand = d3.schemeSet3; // Predefined color scheme
  var defFillv,
      defRb = "1.5px", // Default stroke width
      defFillb = "black", // Default border color
      defFillgL = "rgb(209, 209, 209)", // Default fill gradient color (left)
      defFillgR = "white", // Default fill gradient color (right)
      defOpv = "0.4", // Default opacity
      defFillbR = "none"; // Default fill border

  // Tooltip setup
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .attr("class", "tooltip")
    .style("font-family", "Lato")
    .style("background-color", "white")
    .style("border", "1px solid black")
    .style("padding", "5px")
    .style("color", "black");

  // Create a div to hold the SVG
  var div = d3.create('div');

  // Define dimensions of the SVG canvas
  var width = 800; // Width of the SVG
  var height = 600; // Height of the SVG

  // Create the SVG canvas
  const svg = div.append("svg")
    .attr("width", width)
    .attr("height", height);

  // Calculate the bounding box of the features in the geojson data
  var b = d3.geoBounds(curr_sea_dist_raw);
  var center = [(b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2]; // Center point of the bounding box
  var scale = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height); // Scale factor

  // Define the map projection
  var projection = d3.geoMercator()
    .center(center)
    .scale(scale * 42) // Adjust the scaling factor as needed
    .translate([width / 2, height / 2]);

  // Define the path generator for the map
  var path = d3.geoPath().projection(projection);

  // Define a color scale for the map
  var colorScale = d3.scaleSequential(d3.interpolateBlues)
    .domain([0, 100]); // Domain should be adjusted based on the actual data

  // Function to create the legend
  function createLegend() {
    const legendWidth = 200; // Width of the legend
    const legendHeight = 20; // Height of the legend

    // Create a group element for the legend
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - legendWidth - 20}, ${height - legendHeight - 20})`);

    // Define the scale for the legend
    const legendScale = d3.scaleLinear()
      .domain([0, 100]) // Domain should be adjusted based on the actual data
      .range([0, legendWidth]);

    // Create the legend axis
    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5) // Number of ticks
      .tickFormat(d => `${d}`); // Format for the tick labels

    // Append the axis to the legend
    legend.append("g")
      .attr("transform", `translate(0, ${legendHeight})`)
      .call(legendAxis);

    // Append a rectangle to the legend for the color gradient
    legend.append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#legendGradient)");

    // Define the gradient for the legend
    const gradient = legend.append("defs")
      .append("linearGradient")
      .attr("id", "legendGradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "0%");

    // Add stops to the gradient
    gradient.selectAll("stop")
      .data(d3.ticks(0, 1, 5)) // Generate 5 equally spaced points between 0 and 1
      .enter().append("stop")
      .attr("offset", d => `${d * 100}%`) // Set the offset of each stop
      .attr("stop-color", d => colorScale(d * 100)); // Set the color of each stop


    legend.append("text")
      .attr("class", "legend-label")
      .attr("x", legendWidth / 2)
      .attr("y", -5)
      .style("text-anchor", "middle")
      .style("color", "white")
      .text("Number of Businesses");

    return legend;
  }

  // Function to update the map based on the selected year
  function updateMap(year) {
    // Aggregate business data by ZIP code for the selected year
    var businessCountByZip = d3.rollup(businesses.filter(d => d["License Start Date"].slice(0,4) === year), v => v.length, d => d.Zip);

    // Bind data to the SVG paths and update the map
    svg.selectAll('.curr_sea_dist')
      .data(curr_sea_dist_raw.features)
      .join("path")
      .attr("class", "curr_sea_dist")
      .attr("d", path)
      .attr("id", function(d, i) { return `l1${d.properties.OBJECTID}`; })
      .attr("fill", d => colorScale(businessCountByZip.get(d.properties.ZCTA5CE10) || 0))
      .attr("stroke", "white")
      .attr("stroke-width", "1px")

      // tooltip with the three on...
      .on('mouseover', function(e, d) {
        var zipCode = d.properties.ZCTA5CE10;
        var businessCount = businessCountByZip.get(zipCode) || 0;
        tooltip.style("visibility", "visible").html(`ZIP Code: ${zipCode}<br>Businesses: ${businessCount}`);
        d3.select(this).attr("stroke-width", "2.5px");
      })
      .on('mousemove', function(e) {
        tooltip.style("top", (e.pageY - 10) + "px").style("left", (e.pageX + 20) + "px");
      })
      .on('mouseout', function() {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("stroke-width", "1px");
      });

    // Update the legend
    svg.selectAll(".legend").remove(); // Remove existing legend
    createLegend(); // Create updated legend
  }

  // Initial map update
  updateMap(yearDropdown);

  // Update map when the dropdown value changes
  yearDropdown.addEventListener("input", () => {
    updateMap(yearDropdown.value); // Assuming yearDropdown.value gives the selected year
  });

  return div.node();
};

// Assuming display() function appends the generated SVG to the DOM
function display(content) {
  document.body.appendChild(content);
}
```
```js
// Call voronoiMap2() and pass its result to display()
display(voronoiMap2());
```

<p> The number of businesses in this map steadily increased across all ZIP codes throughout the city and
outlying areas from 2017 to 2019. However, in 2020, the number of businesses fell dramatically. This is largely
due to COVID-19 and the mandated shutdown as a response.
Unfortunately, the low number of businesses peristed through the next few years even as the region starts to
slowly open itself again.
</p>
