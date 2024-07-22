```js
const width = 960;
```

```js
const curr_sea_dist_raw = await FileAttachment("./data/NeighborhoodMapAtlasNeighborhoods.geojson").json();
const curr_sea_dist = curr_sea_dist_raw.features;
```

```js
const markers = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
        -122.2573,
        47.6259
      ]
    }
  }
];
```

```js
const voronoiMap2 = () => {
  var ordinalRand = d3.schemeSet3;
  var defFillv,
      defRb = "1.5px",
      defFillb = "black",
      defFillgL = "rgb(209, 209, 209)",
      defFillgR = "white",
      defOpv = "0.4",
      defFillbR = "none";

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .attr("class", "tooltip")
    .style("font-family", "Lato");

  var div = d3.create('div');
  var projection = d3.geoEquirectangular().scale([145000]).center(markers[0].geometry.coordinates);
  var path = d3.geoPath().projection(projection);

  const svg = div.append("svg").attr("width", width).attr("height", 600);

  // SVG Canvas
  svg.selectAll('.curr_sea_dist')
    .data(curr_sea_dist)
    .enter().append("path")
    .attr("d", path)
    .attr("id", function(d,i) { return `l1${d.properties.fid}`})
    .attr("fill", defFillgL)
    .attr("stroke", "white")
    .attr("stroke-width", "1px")
    .on('mouseover', function(e,d) {
      tooltip.style("visibility", "visible").html(d.properties.geographicalName);
      d3.select(this).attr("stroke-width", "2.5px");
      var thisPara = d3.select(`#l1${d.properties.OBJECTID}`);
      thisPara.attr("fill", defFillgR);
    })
    .on('mouseover', function(e, d) {
      defFillv = d3.select(this).attr("fill");
      d3.select(this).attr("fill", "yellow").attr("opacity", "0.6");
      var thisPara = d3.select(`#l1${d.properties.OBJECTID}`);
      thisPara.attr("fill", defFillgR);
      tooltip.style("visibility", "visible").html(`District: ${d.properties.L_HOOD}`);
    })
    .on("mousemove", function(e, d){return tooltip.style("top", (e.pageY-10)+"px").style("left",(e.pageX+20)+"px");})
    .on('mouseout', function(e, d) {
      d3.select(this).attr("fill", defFillgL).attr("opacity", "1.0");
      var thisPara = d3.select(`#l1${d.properties.OBJECTID}`);
      thisPara.attr("fill", defFillgL).attr("opacity", "1.0");
      tooltip.style("visibility", "hidden");
    });

  return div.node();
};
```

```js
display(voronoiMap2());
```
