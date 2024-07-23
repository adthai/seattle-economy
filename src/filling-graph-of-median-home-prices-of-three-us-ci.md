# Filling graph of median home prices of three US cities

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
    //numericYear-(month (as a date))-day 1
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
const sanFranciscoPlot = html`<div class="card" style="display: flex; flex-direction: column; gap: 1rem;">
  ${Plot.plot({
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
    width: 800,
    height: 400,
    marginTop: 50,
    marginBottom: 80,
    marginLeft: 80
  })}
</div>`;

const seattlePlot = html`<div class="card" style="display: flex; flex-direction: column; gap: 1rem;">
  ${Plot.plot({
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
      label: "Year",
    },
    y: {
      label: "Median Sale Price ($)",
      grid: true
    },
    width: 800,
    height: 400,
    marginTop: 50,
    marginBottom: 80,
    marginLeft: 80
  })}
</div>`;

const newYorkPlot = html`<div class="card" style="display: flex; flex-direction: column; gap: 1rem;">
  ${Plot.plot({
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
    width: 800,
    height: 400,
    marginTop: 50,
    marginBottom: 80,
    marginLeft: 80
  })}
</div>`;
```

```js
display(seattlePlot)
display(sanFranciscoPlot)
display(newYorkPlot);
```