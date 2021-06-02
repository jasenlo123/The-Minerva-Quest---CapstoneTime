const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const { select } = require('d3-selection');

/* sizing parameters*/
const size = 800;
const margin = ({top: 350, right: 0, bottom: 0, left: 0})
const x = d3.scaleLinear([0, 1], [margin.left, size - margin.right])

class CapstoneTime extends D3Component {
  /* init chart component */
  initialize(node, props) {
    
    let data = props.data
  
    /* log data to see if we good */
    console.log("init")
    console.log(data)

    /* stack and normalise data into single bar*/
    const total = d3.sum(data, d => d.minutes);
    let value = 0;
    let stack = data.map(d => ({
        name: d.component,
        hours: d.minutes / 60,
        value: d.minutes / total,
        startValue: value / total,
        endValue: (value += d.minutes) / total,
        inClass: d.inClass,
        component: d.component,
        subComponent: d.subComponent
      }));
    console.log(stack)
  
    /* append svg */
    const svg = (this.svg = d3.select(node).append('svg'));
    svg
      .attr('viewBox', `0 0 ${size} ${size}`)
      .style('width', '100%')
      .style('height', 'auto');
  
    /* append rects, white fill */
    var rects = svg.append("g")
      .attr("stroke", "black")
      .attr("stroke-opacity",0.1)
      .attr("stroke-width",1.5)
      .selectAll("rect")
      .data(stack)
      .join("rect")
      .attr("fill", "white")
      .attr("x", d => x(d.startValue)+1)
      .attr("y", margin.top)
      .attr("width", d => x(d.endValue) - x(d.startValue)- 2)
      .attr("height", 100 - margin.bottom)


    /* assign classes to rects based on category */
    rects.each(function(d) {
      d3.select(this).classed(d.name.split(" ").join(""), () => d3.select(this).datum().name == d.name)
    });

    /* Axis */
    // Add scales to axis
    var scale = d3.scaleLinear()
      .domain([0, total/60])
      .range([3, size-8])
      
    var x_axis = d3.axisBottom()
                  .tickValues(scale.domain())
                  .scale(scale);
    //Append group and insert axis
    svg.append("g")
    .attr("transform", "translate(0,500)")
    .call(x_axis);

    //axis labels
    svg.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("fill", "black")
    .attr("x", size/2)
    .text("Hours")
    .attr("y", 520)


    svg
    .append('circle')
    .attr('cx', 785)
    .attr('cy', 513)
    .attr('r', 15)
    .attr('stroke', 'red')
    .attr('fill', "none")
  }

   update(props, oldProps) {

    let data = props.data
  /* color scale */
    const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

    if (props.step == 0) {
      var svg = select('svg');
      svg
      .selectAll("rect")
      .attr('stroke-opacity',0)

      svg
      .append('circle')
      .attr('cx', 785)
      .attr('cy', 513)
      .attr('r', 15)
      .attr('stroke', 'red')
      .attr('fill', "none")
    }
    
    if (props.step == 1) {
      var svg = select('svg');
      svg
      .selectAll("rect")
      .attr('stroke-opacity',function (d) {
        return (d.component == "Capstone Seminar") ?  1: 0;
          })
      svg
        .selectAll(".CapstoneSeminar")
        .transition()
        .attr("fill", "#fc8d59")

      svg.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("fill", "#fc8d59")
        .attr("x", (size*188/738) /3)
        .text("Capstone Seminar")
        .attr("y", margin.top - 20)
        .attr("font-weight", "bold")

      svg.selectAll("circle")
        .remove()
        .transition()
     }

     else if (props.step == 2) {
        var svg = select('svg');
        svg
        .selectAll("rect")
        .attr('stroke-opacity',function (d) {
          return (d.component == "Capstone Directed Study") ?  1: 0;
            })
        svg
          .selectAll(".CapstoneDirectedStudy")
          .transition()
          .attr("fill", "#99d594")


        svg.append("text")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("fill", "#99d594")
          .attr("x", size/2)
          .text("Capstone Directed Study")
          .attr("y", margin.top - 20)
          .attr("font-weight", "bold")
      }
     else if (props.step == 3)  {
        var svg = select('svg');
        svg
        .selectAll("rect")
        .attr('stroke-opacity',function (d) {
          return (d.component == "Manifest") ?  1: 0;
            })

        svg
          .selectAll(".Manifest")
          .transition()
          .attr("fill", "#91bfdb")


        svg.append("text")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("fill", "#91bfdb")
          .attr("x", size-100)
          .text("Manifest")
          .attr("y", margin.top - 20)
          .attr("font-weight", "bold")


     }
     else if (props.step == 4)  {

        //in class?
        var svg = select('svg');
        svg
          .selectAll("rect")
          .transition()
          .attr('stroke-opacity',function (d) {
            return (d.inClass == 0) ?  0: 1;
              })
    //    .attr('stroke-width',function (d) {
      //    return (d.inClass == 0) ?  0: 1.5;
        //    })
        //restore text infront
        d3.select(".idyll-scroll-graphic")
        .style("z-index", -1)

    }
     
     else if (props.step == 5)  {

        //init tooltip for later
        const tooltip = d3.select(".idyll-scroll-graphic")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        //make transparent
        var svg = select('svg');
        svg
        .selectAll("rect")
        .transition()
        .attr('stroke-opacity',0)

        // hover function
        d3.select(".idyll-scroll-graphic")
          .style("z-index", 5)

        d3.selectAll(".CapstoneDirectedStudy,.CapstoneSeminar,.Manifest")
        .on("mouseover", function (event,d) {
          const rectUnderMouse = d3.select(this); // can't use arrow scoping
          console.log(d)
          rectUnderMouse.attr('stroke-opacity', 1)
          rectUnderMouse.attr('opacity', 0.8);
          tooltip
            .style("opacity", 1)
            .html(`<b>${d.subComponent}</b>` + "<br/>" + d.component + "<br/>" + "Requirements: " + `<b>${Math.round(d.hours)} hours</b>`)
       })
       .on("mousemove", function(event) {
        tooltip
        .style("left", (event.clientX) - 125 + "px")
        .style("top", (event.clientY)+ "px");
       })
        .on("mouseout", function () {
          d3.select(this)
            .attr('stroke-opacity',0)
            .attr('opacity', 1)
          tooltip
          .style("opacity", 0);

        })
      }



  }

    
}

module.exports = CapstoneTime;
