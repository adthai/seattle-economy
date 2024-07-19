---
toc: false
---

```js
import module
```

# Exploration of Seattle's Economy

Seattle is widely acknowledged as one of the fastest growing cities in the country. Recently, its reputation has changed from that of a rainy city with great coffee to one of the top economic and technological hubs in the United States. While it is clear that the economy has dramatically changed over time, the answer to exactly how the economy has changed is a little more nuanced. This set of visualizations attempts to answer the question of how Seattle's economic landscape has changed from 2010 to 2024 by examining business licenses and the housing market.

<!-- the two charts -->
<div class="grid grid-cols-2" style="grid-auto-rows: 504px;">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Your awesomeness over time 🚀",
      subtitle: "Up and to the right!",
      width,
      y: {grid: true, label: "Awesomeness"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(aapl, {x: "Date", y: "Close", tip: true})
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "How big are penguins, anyway? 🐧",
      width,
      grid: true,
      x: {label: "Body mass (g)"},
      y: {label: "Flipper length (mm)"},
      color: {legend: true},
      marks: [
        Plot.linearRegressionY(penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species"}),
        Plot.dot(penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species", tip: true})
      ]
    }))
  }</div>

</div>