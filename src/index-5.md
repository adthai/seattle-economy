# Area chart of median home prices of three US cities
<br>
<br>
<h3><b>Supply and demand on the market:</b></h3>
<p>So far, we have been looking at how businesses have evolved over the last decade in Seattle.
However, it is important to consider the influences that come into play, especially with housing.Knowing more about housing can help us paint a more complete picture of how Seattle
has changed economically. Shown below are area charts showcasing the median home prices from
2012 to 2024 in Seattle and San Francisco, and 2015 to 2024 in New York City.
</p>

<br>

```js
const seattle = FileAttachment("./data/data - seattle.csv").csv()
const sanFrancisco = FileAttachment("./data/data - san francisco.csv").csv()
const newYorkCity = FileAttachment("./data/data - new york city.csv").csv()
```

```js
const cleanedDataSeattle = seattle.map(d => {
  const [month, year] = d["Month of Period End"].split("-");
  const numericYear = 2000 + parseInt(year); // Correctly parse the year from string year to integer 2000+17
  const price = parseFloat(d["Median Sale Price"].replace("$", "").replace("K", "000"));
  //replace $100K string to 100000 float
  return {
    date: new Date(numericYear, new Date(Date.parse(month + "1")).getMonth(), 1),
    price: price
  };
});
```

```js
const cleanedDataSanFrancisco = sanFrancisco.map(d => {
  const [month, year] = d["Month of Period End"].split("-");
  const numericYear = 2000 + parseInt(year); // Correctly parse the year

  // Parse the price, handle 'K' for thousands and 'M' for millions
  let priceString = d["Median Sale Price"];
  let price;
  if (priceString.includes(",")) {
    price = parseFloat(priceString.replace("$", "").replace(",", "").replace("K", "")) * 1000;
  } else if (priceString.includes("K")) {
    price = parseFloat(priceString.replace("$", "").replace("K", "")) * 1000;
  } else {
    price = parseFloat(priceString.replace("$", ""));
  }

  // Parse the month and create a Date object
  const date = new Date(numericYear, new Date(Date.parse(month + " 1")).getMonth(), 1);

  return {
    date: date,
    price: price
  };
});
```

```js
const cleanedDataNewYork = newYorkCity.map(d => {
  const [month, year] = d["Month of Period End"].split("-");
  const numericYear = 2000 + parseInt(year); // Correctly parse the year

  // Parse the price, handle 'K' for thousands and 'M' for millions
  let priceString = d["Median Sale Price"];
  let price;
  if (priceString.includes(",")) {
    price = parseFloat(priceString.replace("$", "").replace(",", "").replace("K", "")) * 1000;
  } else if (priceString.includes("K")) {
    price = parseFloat(priceString.replace("$", "").replace("K", "")) * 1000;
  } else {
    price = parseFloat(priceString.replace("$", ""));
  }

  // Parse the month and create a Date object
  const date = new Date(numericYear, new Date(Date.parse(month + " 1")).getMonth(), 1);

  return {
    date: date,
    price: price
  };
});
```

```js
const filteredDataSeattle = cleanedDataSeattle.filter(d => d.date.getFullYear() >= 2012 && d.date.getFullYear() <= 2024);

```
```js
const filteredDataSanFrancisco = cleanedDataSanFrancisco.filter(d => d.date.getFullYear() >= 2012 && d.date.getFullYear() <= 2024);
```
```js
const filteredDataNewYork = cleanedDataNewYork.filter(d => d.date.getFullYear() >= 2012 && d.date.getFullYear() <= 2024);
```

```js

const seattlePlot =
resize((width) => Plot.plot({
    marks: [
      Plot.lineY(filteredDataSeattle, {
        x: d => d.date,
        y: d => d.price,
        stroke: "salmon",
        strokeWidth: 4.0,
        title: d => `Date: ${d.date.toLocaleDateString()} \nPrice: $${d.price.toFixed(2)}`
      }),
      Plot.areaY(filteredDataSeattle, {
        x: d => d.date,
        y: d => d.price,
        fill: "salmon",
        fillOpacity: 0.3
      })
    ],
    x: {
      label: "salmon",
    },
    y: {
      label: "Median Sale Price ($)",
      grid: true
    },
    width,
    height: 400,
    marginTop: 50,
    marginBottom: 80,
    marginLeft: 80
  }));


const sanFranciscoPlot =
resize((width) => Plot.plot({
    marks: [
      Plot.lineY(filteredDataSanFrancisco, {
        x: d => d.date,
        y: d => d.price,
        stroke: "blue",
        strokeWidth: 4.0,
        title: d => `Date: ${d.date.toLocaleDateString()} \nPrice: $${d.price.toFixed(2)}`
      }),
      Plot.areaY(filteredDataSanFrancisco, {
        x: d => d.date,
        y: d => d.price,
        fill: "blue",
        fillOpacity: 0.3
      })
    ],
    x: {
      label: "Year",
    },
    y: {
      label: "Median Sale Price ($)",
      grid: true
    },
    width,
    height: 400,
    marginTop: 50,
    marginBottom: 80,
    marginLeft: 80
  }));

const newYorkPlot =
resize((width) => Plot.plot({
    marks: [
      Plot.lineY(filteredDataNewYork, {
        x: d => d.date,
        y: d => d.price,
        stroke: "green",
        strokeWidth: 4.0,
        title: d => `Date: ${d.date.toLocaleDateString()} \nPrice: $${d.price.toFixed(2)}`
      }),
      Plot.areaY(filteredDataNewYork, {
        x: d => d.date,
        y: d => d.price,
        fill: "green",
        fillOpacity: 0.3
      })
    ],
    x: {
      label: "Year",
    },
    y: {
      label: "Median Sale Price ($)",
      grid: true
    },
    width,
    height: 400,
    marginTop: 50,
    marginBottom: 80,
    marginLeft: 80
  }));


```
```js
display(seattlePlot)
display(sanFranciscoPlot)
display(newYorkPlot);
```

<div class="grid grid-cols-2" style="grid-auto-rows: 504px;">
  <div class="card"> ${seattlePlot} </div>
  <div class="card"> ${sanFranciscoPlot}</div>
  <div class="card"> ${newYorkPlot}</div>
</div>

<style>
  .plot-tick text {
    font-size: 30px;
  }
</style>

<p>Throughout the last decade, housing has skyrocketed in many major cities across the US,
Seattle in particular. As mentioned before, demand in jobs has risen in an exponential amount.
This leads to an unprecedented amount of people coming to cities such as Seattle. If you take
a look around 2016-2019, home prices skyrocketed.</p>

<p>However, when COVID-19 hit across the world, many cities have led to a migration of thousands
leaving big cities. The population in these three cities, including Seattle, decreased in 2020.
There are many factors to this phenomena. Many people had to emigrate to their hometowns as mandated. Others left because of personal reasons regarding the disease or
the government itself. This led to a cool off of home prices in the three cities, plateauing as shown in the three graphs. </p>

<p> Things started picking up again slowly after COVID, with people coming back to these cities,
increasing home prices again. Overall, we can see that Seattle provides the most exponential increase in median home prices compared to San Francisco and New York </p>
