
var sampleData = null


// Initializing  D3 //
function init() {
  let link =  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {

    this.sampleData = data;
    var name = data.names;

    //dropdown
    name.forEach(function(name) {
      d3.select('#selDataset').append('option').text(name)
    });

    this.optionChanged(this.sampleData.samples[0].id);
  });

}

function optionChanged(value) {
  console.log(value)
  console.log(this.sampleData)
  const sampleIndex = sampleData.samples.findIndex((data) => data.id == value);

  // top 10 OTUS Array
  let sample_values = sampleData.samples[sampleIndex].sample_values;
  let otu_ids = sampleData.samples[sampleIndex].otu_ids;
  let otu_labels = sampleData.samples[sampleIndex].otu_labels;

  //ten OTUS
  let topTen = sample_values.slice(0, 10).sort((a, b) => b - a);
  let topIds = otu_ids.slice(0, 10)
  let toplabels = otu_labels.slice(0, 10).sort((a, b) => b - a);

  //metadata
  let firstID = d3.select("#sample-metadata").selectAll('h1').data(d3.entries(sampleData.metadata[sampleIndex]))
  firstID.enter().append('h1').merge(firstID).text(d => `${d.key} : ${d.value}`).style('font-size','12px')

  let barChart = {
    x: topTen,
    y: topIds.map(x => "OTU " + x),
    text: toplabels,
    type: 'bar',
    orientation: 'h',
    transforms: [{
      type: 'sort',
      target: 'y',
      order: 'descending'
    }]
  };
  var layoutOne = {
    title: '<b>Top Ten OTU<b>'
  };

  let dataOne = [barChart];
  Plotly.newPlot('bar', dataOne, layoutOne);

  //Bubble Chart//
  let bubbleChart = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values
    }
  };
  var layoutTwo = {
    title: '<b>Bubble Chart<b>',
    xaxis: {title: 'OTU ID'},
    automargin: true,
    autosize: true,
  };

  let dataTwo = [bubbleChart];
  Plotly.newPlot('bubble', dataTwo, layoutTwo);
}


init();
