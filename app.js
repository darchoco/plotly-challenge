var demoInfo =  d3.select("#sample-metadata"); 


function createDictionary(dictionary,key,value)
{
  dictionary[key] = value;
}
  

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
    var intialid = d3.select("#selDataset").node().value
    //printing data
    optionChanged(intialid)


  });

};

function optionChanged(input)
{
  console.log(input)
 // var filtereddata = d3.select("#selDataset").node().value;
  d3.json("samples.json").then((data) => {
    console.log(data)
    
      //calling defined function to filter metadat
      var dataDict = {}
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

        for (var i = 0; i < samplesPlotData.otu_ids.length; i++)
        {
            createDictionary(dataDict, `OTU ${samplesPlotData.otu_ids[i]}`,samplesPlotData.sample_values[i]);
              
        }
        // Create items array
        var items = Object.keys(dataDict).map(function(key) {
          return [key, dataDict[key]];
        });
        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });
        topTenOTU = items.slice(0, 10);
        // Create a new array with only the first 5 items
        topTenOTUIDs = []
        topTenOTUValues = []
        for (var i = 0; i < topTenOTU.length; i++)
        {
          topTenOTUIDs.push(topTenOTU[i][0])
          topTenOTUValues.push(topTenOTU[i][1])
        }
      //  Create the Traces
      var trace1 = 
      {
        x: samplesPlotData.otu_ids,
        y: samplesPlotData.sample_values,
        mode: 'markers',
        marker: {
          size: samplesPlotData.sample_values,
          color: samplesPlotData.otu_ids 
        }
      };
    
      // // Create the data array for the plot
      var data1 = [trace1];
      
      // // Define the plot layout
      var layout1= 
      {
        xaxis: { title: "OTU ID" }
      };
    
      var trace2 =
      {
        type: 'bar',
        x: topTenOTUValues,
        y: topTenOTUIDs,
        orientation: 'h'

      }
      var data2 = [trace2]
      var layout2= 
      {
        yaxis: { showticklabels: true},
        hovertext: samplesPlotData.otu_labels,
        maxdisplayed:10
      };
      // Plot the chart to a div tag with id "plot"
      Plotly.newPlot("bubble", data1, layout1);
      Plotly.newPlot("bar",data2, layout2)
})};

getdata()