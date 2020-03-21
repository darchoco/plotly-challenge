//defining variable for manipulation later
var filtereddata = null

//filter function defined to be called when data is generated
//utilizes startingdata variable that is defined before the filter is called
function filterData(data)
{
  for (var i = 0; i < data.length; i++)
  {
    console.log(data[i].id)
    if (data[i].id = parseInt(filtereddata))
    {
    return data;
    }
  }
  
};


function getdata()
{
d3.json("samples.json").then((data) => {
  //dyanmically obtains the dropdown data from the json file and inserts it into the dropdown
 var dropdown = d3.select("#selDataset").selectAll("select");
    dropdown.data(data.names)
    .enter()
    .append("option")
    .html(function(d)
    {
      return `<option value = "${d}">${d}</option>`
    })

    //printing data
    console.log(data.metadata[0].id)


  });

};

function graphData()
{
  d3.json("samples.json").then((data) => {
      //defining selection on the dropdown as the starting data to filter to from the data
      var filtereddata = d3.select("#selDataset").node().value;

      //calling defined function to filter metadat
      var metadataPlotData = filterData(data.metadata);
      var samplesPlotData = filterData(data.samples);
      console.log(samplesPlotData);
      //  Create the Traces
      // var trace1 = {
      //   x: data.organ,
      //   y: data.survival.map(val => Math.sqrt(val)),
      //   type: "box",
      //   name: "Cancer Survival",
      //   boxpoints: "all"
      // };
    
      // // Create the data array for the plot
      // var data = [trace1];
    
      // // Define the plot layout
      // var layout = {
      //   title: "Square Root of Cancer Survival by Organ",
      //   xaxis: { title: "Organ" },
      //   yaxis: { title: "Square Root of Survival" }
      // };
    
      // // Plot the chart to a div tag with id "plot"
      // Plotly.newPlot("plot", data, layout);
})};

function optionChanged()
{
  graphData()
}
getdata()