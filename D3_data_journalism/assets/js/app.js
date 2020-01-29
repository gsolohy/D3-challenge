// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 600;

var margin = {
    top: 40,
    right: 40,
    bottom: 60,
    left: 60
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter").append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

var chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./assets/data/data.csv").then(data => {
    console.log(data);
    data.forEach(d => {
        d.income = +d.income;
        d.obesity = +d.obesity;
    });

    var xScale = d3.scaleLinear()
                   .domain(d3.extent(data, x => x.income))
                   .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
                   .domain(d3.extent(data, y => y.obesity))
                   .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    chartGroup.append("g")
              .attr("transform", `translate(0, ${chartHeight})`)
              .style("font-size", "12px")
              .call(bottomAxis);

    var leftAxis = d3.axisLeft(yScale);
    chartGroup.append("g")
              .style("font-size", "12px")
              .call(leftAxis);

    var circles = chartGroup.selectAll("circle").data(data).enter().append("circle");
    var circleAttributes = circles.attr("cx", x => xScale(x.income))
                                  .attr("cy", y => yScale(y.obesity))
                                  .attr("r", 15)
                                  .attr("fill", "teal")
                                  .attr("opacity", ".4");

    var texts = chartGroup.selectAll("text.text-circles").data(data).enter().append("text");
    var textAttributes = texts.attr("class","text-circles")
                              .attr("x", x => xScale(x.income))
                              .attr("y", y => yScale(y.obesity))
                              .text(d => d.abbr)
                              .attr("text-anchor", "middle")
                              .attr("font-size","10px")
                              .attr("fill", "white")
                              .attr("dy",3);

    var axisLabelx = chartGroup.append("text").attr("class", "aText");
    var axisLabely = chartGroup.append("text").attr("class", "aText");
    var xaxis = axisLabelx.attr("x", chartWidth/2)
                         .attr("y", chartHeight + margin.bottom - 10)
                         .text("Income ($)");

    var yaxis = axisLabely.attr("transform", "rotate(-90)")
                         .attr("x", 0 - chartHeight/2)
                         .attr("y", 20 - margin.left)
                         .text("Average Obesity (%)");

}).catch(error => {
    console.log(error);
});