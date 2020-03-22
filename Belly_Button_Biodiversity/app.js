var demoInfo =  d3.select("#sample-metadata"); 
//filter function defined to be called when data is generated
//utilizes startingdata variable that is defined before the filter is calle
function filterData(data, input)
{
for (var i = 0; i < data.length; i++)
{
  var dataNum = parseInt(data[i].id)
  if (dataNum == parseInt(input))
  {
  return data[i];
  }
}
}

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
    });

    //printing data
    console.log(data.metadata[0].id)


  });

};

function optionChanged(input)
{
  console.log(input)
 // var filtereddata = d3.select("#selDataset").node().value;
  d3.json("samples.json").then((data) => {
    console.log(data)
    
      //calling defined function to filter metadat

      var metadataPlotData = filterData(data.metadata, input);
      var samplesPlotData = filterData(data.samples, input);
      demoInfo.html("")
        pLine = demoInfo.append("p");
        pLine.append('p').text(`id: ${metadataPlotData.id}`);
        pLine.append('p').text(`ethnicity: ${metadataPlotData.ethnicity}`);
        pLine.append('p').text(`gender: ${metadataPlotData.gender}`);
        pLine.append('p').text(`age: ${metadataPlotData.age}`);
        pLine.append('p').text(`location: ${metadataPlotData.location}`);
        pLine.append('p').text(`bbtype: ${metadataPlotData.bbtype}`);
        pLine.append('p').text(`wfreq: ${metadataPlotData.wfreq}`);

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

getdata()