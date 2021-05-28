const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const { select } = require('d3-selection');

/* sizing parameters*/
const size = 800;
const margin = ({top: 350, right: 0, bottom: 0, left: 0})
const x = d3.scaleLinear([0, 1], [margin.left, size - margin.right])

const redraw = (props_data) => {
  var svg = d3.select('svg');

  const data = props_data
  console.log("redraw")
  console.log(data)


/* color scale */
  const color = d3.scaleOrdinal()
  .domain(data.map(d => d.name))
  .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

  const total = d3.sum(data, d => d.minutes);
  let value = 0;
  let stack = data.map(d => ({
      name: d.component,
      value: d.minutes / total,
      startValue: value / total,
      endValue: (value += d.minutes) / total
    }));

  svg.select("g")
    .attr("stroke", "white")
    .selectAll("rect")
    .data(stack)
    .join("rect")
    .attr("fill", d => color(d.name))
    .attr("x", d => x(d.startValue))
    .attr("y", margin.top)
    .attr("width", d => x(d.endValue) - x(d.startValue))
    .attr("height", 100 - margin.bottom)
}

class CapstoneTime extends D3Component {
  /* init chart component */
  initialize(node, props) {
    
    let data = props.data

    /* log data to see if we good */
    console.log("init")
    console.log(data)

    const total = d3.sum(data, d => d.minutes);
    let value = 0;
    let stack = data.map(d => ({
        name: d.component,
        value: d.minutes / total,
        startValue: value / total,
        endValue: (value += d.minutes) / total
      }));
    console.log(stack)
  
  
    const svg = (this.svg = d3.select(node).append('svg'));
    svg
      .attr('viewBox', `0 0 ${size} ${size}`)
      .style('width', '100%')
      .style('height', 'auto');
  
    var rects = svg.append("g")
      .attr("stroke", "silver")
      .selectAll("rect")
      .data(stack)
      .join("rect")
      .attr("fill", "white")
      .attr("x", d => x(d.startValue))
      .attr("y", margin.top)
      .attr("width", d => x(d.endValue) - x(d.startValue))
      .attr("height", 100 - margin.bottom)

    /* assign classes to rects based on category */
    rects.each(function(d) {
      d3.select(this).classed(d.name.split(" ").join(""), () => d3.select(this).datum().name == d.name)
  });
    
  }

   update(props, oldProps) {

    let data = props.data
  /* color scale */
    const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
    

    if (props.step == 1) {
      var svg = select('svg');
      svg
        .selectAll(".CapstoneSeminar")
        .transition()
        .attr("fill", "green")
        .attr("stroke", "white")
     }
     else if (props.step == 2) {
      var svg = select('svg');
      svg
        .selectAll(".CapstoneDirectedStudy")
        .transition()
        .attr("fill", "yellow")
        .attr("stroke", "white")

     }
     else {
      var svg = select('svg');
      svg
        .selectAll(".Manifest")
        .transition()
        .attr("fill", "orange")
        .attr("stroke", "white")

     }


  }

    
}

module.exports = CapstoneTime;
