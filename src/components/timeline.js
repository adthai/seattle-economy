import * as Plot from "npm:@observablehq/plot";

export function timeline(events, {width, height} = {}) {
  return Plot.plot({
marginLeft: 130,
  axis: null,
  x: {
    axis: "top",
    grid: true,
    tickFormat: (x) => x < 0 ? `${-x} BC` : `${x} `
  },
  marks: [
    Plot.barX(events, {
      x1: "start",
      x2: "end",
      y: "event",
      sort: {y: "x1"}
    }),
    Plot.text(events, {
      x: "start",
      y: "event",
      text: "event",
      textAnchor: "end",
      dx: -3
    })
  ]
  });
}
