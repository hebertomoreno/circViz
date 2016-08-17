var margin = {top: 20, right: 50, bottom: 0, left: 50},
    w = 1100 - margin.left - margin.right,
    h = 400 - margin.top - margin.bottom;

var padding = 20;

var radio = 10;

function circViz () {
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w + margin.left + margin.right)
				.attr("height",h + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	/*Domains*/
	var xDom = d3.extent(dataset, function(d){
		return d[0];
	})
	var yDom = d3.extent(dataset,function(d)
	{
		return d[1];
	})

	/*Scales*/
	var xScale = d3.scaleLinear()
					.domain(xDom)
					.range([0, w]);
	var yScale = d3.scaleLinear()
					.domain(yDom)
					.range([h-padding,0]);

	/*Axes*/
	var xAxis = d3.axisBottom()
					.scale(xScale)
					.ticks(5);
	var yAxis = d3.axisLeft()
					.scale(yScale)
					.ticks(5);

	d3.csv("table.csv", function(error, data) {
		if (error) throw error;
		svg.appeng("g")
			.attr("class", "xAxis")
			.attr("transform", "translate(0, "+height+")")
			.call(xAxis);
		svg.append()
	}
}

$(document).ready(circViz);