---
title: History
---


<h1> Seattle's Economic History </h1>

```js
import {timeline} from "./components/timeline.js";
```

```js
const events = FileAttachment("./data/events.json").json();
```

```js
timeline(events, {height: 300})
```
<p>Scroll down to see each section </p>
<div class="sticky-container">


  <div class="sticky-section">

  ### 19th century
  <ul id= "found-growth">
    <li> <b>1851:</b> Seattle was founded by Arthur A. Denny and his group of settlers on the eastern shore of Elliot Bay. Initially a small settlement, its location provided access to timber resources, which became crucial for early economic activities.
    </li>
    <li> <b>1860s-1870s:</b> Logging emerged as a primary industry due to the region's vast forests of Douglas fir and western red cedar. Logs were transported by water to sawmills, supporting Seattle's early growth as a lumber town.
    </li>
    <li> <b>1880s:</b> The arrival of the railroad in Seattle in the 1880s facilitated easier transportation of goods and resources, boosting trade and stimulating economic development.
    </li>
  </ul>
  </div>



  <div class="sticky-section">

  ### Early 20th century
  <ul id= "found-growth">
    <li><b>1897-1899:</b> The Klondike Gold Rush brought thousands of prospectors through Seattle on their way to Alaska and the Yukon, transforming the city into a supply and transportation hub. This event significantly boosted Seattle's economy and population.
    </li>
    <li><b>1907:</b> The completion of the Lake Washington Ship Canal connected Puget Sound to Lake Union and Lake Washington, creating a continuous navigable waterway. This enhanced Seattle's maritime trade capabilities and contributed to its status as a major port city.
    </li>
    <li><b>1910s-1920s:</b> Boeing Company, founded in 1916, initially manufactured seaplanes and then transitioned to military aircraft production during World War I. This marked the beginning of Seattle's aerospace industry, which would later become a cornerstone of the city's economy.
    </li>
  </ul>
  </div>

  <div class="sticky-section">

  ### Great Depression & World War II
  <ul id= "found-growth">
    <li><b>1930s:</b> Seattle, like much of the United States, suffered during the Great Depression. The city saw significant unemployment and economic hardship, although federal programs like the New Deal provided some relief and infrastructure development.
    </li>
    <li>
    <b>1940s:</b> During World War II, Seattle's economy rebounded due to the demand for aircraft production. Boeing emerged as a major manufacturer of military planes, employing tens of thousands and transforming the region into a center of aerospace innovation.
    </li>
  </ul>
  </div>


  <div class="sticky-section">

  ### Post-War Expansion
  <ul id= "found-growth">
    <li><b>1950s-1960s:</b> After World War II, Boeing continued to dominate Seattle's economy, becoming the world's largest aerospace company. The company's growth fueled rapid population expansion and suburbanization in the Seattle metropolitan area.
    </li>
    <li>
    <b>1970s:</b> The "Boeing Bust" in the early 1970s led to significant job losses and economic downturns as the company faced canceled government contracts and a declining market for commercial aircraft.
    </li>
  </ul>
  </div>

  <div class="sticky-section">

  ### Late 20th Century
  <ul id= "found-growth">
    <li><b>1970s-1980s:</b> Seattle began diversifying its economy away from its dependence on Boeing. The emergence of the technology sector started with companies like Microsoft, founded in nearby Redmond in 1975. This laid the foundation for Seattle's future as a technology hub.
    </li>
    <li>
    <b>1980s-1990s:</b> Microsoft's rapid growth during the 1980s and 1990s contributed to the region's economic prosperity. Other technology companies, along with advancements in software development, further solidified Seattle's reputation as a center for technology and innovation.
    </li>
  </ul>
  </div>

  <div class="sticky-section">

  ### 21st Century
  <ul id= "found-growth">
    <li> <b>2000s:</b> Amazon.com, founded in 1994, expanded significantly in Seattle during the 2000s. The company's growth fueled demand for office space and attracted a highly skilled workforce, contributing to Seattle's economic boom.
    </li>
    <li>
    <b>2010s:</b> Seattle experienced robust economic growth driven by technology, biotechnology, healthcare, and logistics sectors. The city became known for its thriving startup scene and attracted a diverse range of industries.
    </li>
    <li>
    <b>2020s:</b> Seattle continued to see growth in technology and innovation, although challenges such as housing affordability and homelessness became more pronounced. The city grappled with balancing economic development with social and environmental concerns.
    </li>
  </ul>
  </div>

  </div>


<style>
.sticky-container {
  height: 50vh;
  width: 100vw;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
}

.sticky-section {
  display: flex;
  text-wrap: wrap;
  align-items: center;
  font-size: 13.5px;
  width: 70%;
  height: 100%;
  scroll-snap-align: start;
}
</style>