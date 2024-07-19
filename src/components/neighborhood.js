// Define constants and variables
const width = 800; // Set your desired width
const height = 600; // Set your desired height

const markers = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-122.2573, 47.6259]
    }
  }
];

const defFillgL = "rgb(209, 209, 209)";
const defFillgR = "white";

const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .attr("class", "tooltip")
  .style("font-family", "Lato");

const div = d3.select("#map");
const projection = d3.geoEquirectangular().scale([145000]).center(markers[0].geometry.coordinates);
const path = d3.geoPath().projection(projection);

const svg = div.append("svg").attr("width", width).attr("height", height);


// Function to load GeoJSON data and create the map
function createMap(geoData) {
  console.log("GeoData Loaded:", geoData); // Check if data is loaded
  const curr_sea_dist = geoData.features;
  console.log("Features:", curr_sea_dist); // Check if features are being parsed correctly

  svg.selectAll('.curr_sea_dist')
    .data(curr_sea_dist)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "curr_sea_dist")
    .attr("fill", defFillgL)
    .attr("stroke", "white")
    .attr("stroke-width", "1px")
    .on('mouseover', function (e, d) {
      tooltip.style("visibility", "visible").html(`District: ${d.properties.L_HOOD}`);
      d3.select(this).attr("stroke-width", "2.5px").attr("fill", "yellow").attr("opacity", "0.6");
    })
    .on("mousemove", function (e) {
      tooltip.style("top", (e.pageY - 10) + "px").style("left", (e.pageX + 20) + "px");
    })
    .on('mouseout', function () {
      d3.select(this).attr("fill", defFillgL).attr("opacity", "1.0").attr("stroke-width", "1px");
      tooltip.style("visibility", "hidden");
    });
}

// Fetch the GeoJSON file and create the map
fetch('./components/Neighborhood_Map_Atlas_Neighborhoods.geojson')
  .then(response => response.json()) // Parse as JSON
  .then(data => createMap(data)) // Pass data to createMap
  .catch(error => console.error('Error loading the GeoJSON data:', error));



// Fetch the GeoJSON file and create the map
fetch('./components/Map%20of%20Seattle%20with%20Neighborhoods.geojson')
  .then(response => response.json()) // Parse as JSON
  .then(data => createMap(data)) // Pass data to createMap
  .catch(error => console.error('Error loading the GeoJSON data:', error));
