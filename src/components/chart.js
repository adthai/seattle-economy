import * as Plot from "npm:@observablehq/plot";


export function chart(businesses) {
    const years = Array.from({ length: 6}, (_, i) => (2017 + i).toString());

     businessInput = Inputs.select(
      [...new Set(businesses.map(b => b["NAICS Description"]))],
      { label: "Pick an industry" }
    )

    const business = Generators.input(businessInput);

    // obtaining the year based on the License Start Date of each business
    function getYear(business) {
      return business["License Start Date"].substring(0, 4);
    }

    //sort each business by the industry the business serves
    function filterByIndustry(industry) {
      return businesses.filter(b => b["NAICS Description"] === industry);
    }

    function countBusinessesByYear(industry) {
      const filtered = filterByIndustry(industry);
      const counts = {};
      for (let year = 2017; year <= 2022; year++) {
        counts[year.toString()] = filtered.filter(b => getYear(b) === year.toString()).length;
      }

      return counts;
    }

   return  Plot.plot({
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
}