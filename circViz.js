var margin = {top: 20, right: 50, bottom: 0, left: 50},
    w = 1100 - margin.left - margin.right,
    h = 400 - margin.top - margin.bottom;

var padding = 20;

var totalPrecio = 0, 
	totalValor  = 0,
	numValores = 0;

function circViz () {
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w + margin.left + margin.right)
				.attr("height",h + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	/*Scales*/
	var xScale = d3.scaleLinear()
					.range([0, w]);
	var yScale = d3.scaleLinear()
					.range([h-padding,0]);
	var vScale = d3.scaleLinear()
					.range([0,30]);
	var aScale = d3.scaleLinear()
					.range([0,1]);

	/*Axes*/
	var xAxis = d3.axisBottom()
					.scale(xScale)
					.ticks(10);
	var yAxis = d3.axisLeft()
					.scale(yScale)
					.ticks(10);
	var avgYAxis = d3.axisLeft()
					.scale(yScale)
					.ticks(0);
	var avgXAxis = d3.axisTop()
					.scale(xScale)
					.ticks(0);

	d3.csv("dataset.csv", function(error, data) {
		var f = d3.format(".2");
		if (error) throw error;
		/*Translate csv to usable integers or numbers*/
		data.forEach(function(d) {
			d.valor = +d.Valor;
			d.precio = +d.Precio;
			d.volumen = +d.Volumen;
			totalPrecio += d.precio;
			totalValor += d.valor;
			numValores++;
		})

		var avgPrecio = totalPrecio / numValores;
		var avgValor = totalValor / numValores;
		/*Define the domains using the csv information*/
		var xDom = d3.extent(data, function(d) {
			return d.precio;
		})
		xScale.domain(xDom);
		var yDom = d3.extent(data,function(d) {
			return d.valor;
		})
		yScale.domain(yDom);
		var vDom = d3.extent(data, function(d) {
			return d.volumen;
		})
		vScale.domain(vDom);
		aScale.domain(vDom);
		/*Draw Circles*/
		svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return xScale(d.precio);
		})
		.attr("cy", function(d) {
			return yScale(d.valor);
		})
		.attr("r", function(d){
			return vScale(d.volumen);
		})
		.attr("fill", function(d){
			var rgbR = Math.round(Math.random() * 255);
			//var rgbR = rgbR.toString(16);
			var rgbG = Math.round(Math.random() * 255);
			//var rgbG = rgbG.toString(16);
			var rgbB = Math.round(Math.random() * 255);
			//var rgbB = rgbG.toString(16);
			var alph = +f(aScale(d.volumen));
			return "rgba("+rgbR+","+rgbG+","+rgbB+","+alph+")";
		});
		svg.app
		/*Draw Axes*/
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0, "+(h-margin.top)+")")
			.call(xAxis);
		svg.append("g")
			.attr("class", "axis")
			.call(yAxis);
		svg.append("g")
			.attr("class", "avgAxis")
			.attr("transform", "translate("+xScale(avgPrecio)+",0)")
			.call(avgYAxis);
		svg.append("g")
			.attr("class", "avgAxis")
			.attr("transform", "translate(0,"+yScale(avgValor)+")")
			.call(avgXAxis);
		d3.select("body")
			.append("h1")
			.text("Promedio Precio = "+ avgPrecio);
		d3.select("body")
			.append("h1")
			.text("Promedio Valor = "+ avgValor);

	})
}

$(document).ready(circViz);