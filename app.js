
//defining intial variable for reference in function optionChanged
var demoInfo =  d3.select("#sample-metadata"); 

//filter function defined to be called when data is generated
//utilizes data received from json string and input from dropdown to compare, and return only where there is a match
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


//initial data pull
function getdata()
{
  //sets up json read
d3.json("samples.json").then((data) => 
{
  //dyanmically obtains the dropdown data from the json file and inserts it into the dropdown
 var dropdown = d3.select("#selDataset").selectAll("select");
    dropdown.data(data.names)
    .enter()
    .append("option")
    .html(function(d)
    {
      return `<option value = "${d}">${d}</option>`
    });
    //finds id that is currently selected in the dropdown
    var currentID = d3.select("#selDataset").node().value
    optionChanged(currentID)
  });

};

//set up function called in index.html on change, as well as from intial pull up
function optionChanged(input)
{
  //call json data for info from change
  d3.json("samples.json").then((data) => {
    
      //creating empty data dictionary that will be used to put together the OTU ID and counts
      //declaring two arrays for displaying the top ten OTU ID counts to be filled later
      var dataDict = {}
      topTenOTUIDs = []
      topTenOTUValues = []
      //call filter function to filter down to metadata
      var metadataPlotData = filterData(data.metadata, input);

      //call filter function to filter down to samples data
      var samplesPlotData = filterData(data.samples, input);
      //clear any data in the Demoggraphic Info window
      demoInfo.html("")
      //write in each section of the data by calling filtered data
        pLine = demoInfo.append("p");
        pLine.append('p').text(`id: ${metadataPlotData.id}`);
        pLine.append('p').text(`ethnicity: ${metadataPlotData.ethnicity}`);
        pLine.append('p').text(`gender: ${metadataPlotData.gender}`);
        pLine.append('p').text(`age: ${metadataPlotData.age}`);
        pLine.append('p').text(`location: ${metadataPlotData.location}`);
        pLine.append('p').text(`bbtype: ${metadataPlotData.bbtype}`);
        pLine.append('p').text(`wfreq: ${metadataPlotData.wfreq}`);

        //loop through otu_id and value data to combine them together for proper sorting
        //also assign the proper naming for displaying on the graph
        for (var i = 0; i < samplesPlotData.otu_ids.length; i++)
        {
            dataDict[`OTU ${samplesPlotData.otu_ids[i]}`] = samplesPlotData.sample_values[i];
              
        }
        // Create items array in order to sort dictionary
        var items = Object.keys(dataDict).map(function(key) {
          return [key, dataDict[key]];
        });
        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });
        //slice to only hold the top 10 highest IDs
        topTenOTU = items.slice(0, 10);

        //loop through sliced array from dictionary, push to arrays for displaying
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
        text: samplesPlotData.otu_labels,
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
     //  Create the Traces
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
      // Plot the charts to the divs bubble, bar
      Plotly.newPlot("bubble", data1, layout1);
      Plotly.newPlot("bar",data2, layout2)
})};
//pull intial data on load
getdata()