jQuery(document).ready(function ($) {

	$( "#menu" ).accordion({
      collapsible: true,
      heightStyle: "content",
      navigation: true 
    });
	$('.upload_web_data').on('click', function(){
		dataUrl = jQuery('#data_url').val();
		// data_url = jQuery('.data_url').val();
		console.log(dataUrl);
		// data = httpGet(data_url);
		// console.log(data);
		jQuery.getJSON('http://websitescraper.heroku.com/?url=' + dataUrl + '&callback=?', function (csvdata) {
			// console.log(csvdata);
			data = $.csvIn.toJSON(csvdata);
			// console.log(data[0]);
			// console.log(data);
			$.each(data[0], function(index, value){
				$('#x_axis, #y_axis').append($('<option>', { 
			        value: index,
			        text : index 
			    }));
			});
		});
	});

	$('.create_chart').on('click', function(){
		xAxis = $('.x_axis').val();
		yAxis = $('.y_axis').val();
		chartType = $('.chart_type.selected').data();
		if (chartType.type == 'dimple.plot.bar')
			chartType.type = dimple.plot.bar;
		if (chartType.type == 'dimple.plot.area')
			chartType.type = dimple.plot.area;
		if (chartType.type == 'dimple.plot.pie')
			chartType.type = dimple.plot.pie;

		console.log(chartType.type + " " + xAxis + " " + yAxis);
		createChart(chartType.type, xAxis, yAxis, dataUrl);
	});

	$('.chart_type').on('click', function(){
		$('.chart_type').removeClass('selected');
		$(this).addClass('selected');
	});

 //	   var txtFile = new XMLHttpRequest();
 //    txtFile.open("GET", "http://ichart.finance.yahoo.com/table.csv?s=RIL.BO", true);
 //    txtFile.onreadystatechange = function() {
 //      	if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
 //        	if (txtFile.status === 200) {  // Makes sure it's found the file.
 //         		allText = txtFile.responseText;
 //          		lines = txtFile.responseText.split("\n"); // Will separate each line into an array
 //          		console.log(allText);
 //        	}
 //      	}
 //    }

    //jQuery.getJSON('http://websitescraper.heroku.com/?url=http://ichart.finance.yahoo.com/table.csv?s=RIL.BO&callback=?', function (csvdata) {
    


	
	
	
});



function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function createChart(chartType, xAxis, yAxis, dataUrl){
	var svg = dimple.newSvg("#chartContainer", 590, 400);
	// d3.tsv("../data/example_data.tsv", function (data) {
	d3.csv(dataUrl, function (data) {
	// d3.csv("http://ichart.finance.yahoo.com/table.csv", function (data){  

	  // data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
	  var myChart = new dimple.chart(svg, data);
	  myChart.setBounds(60, 30, 505, 305);

	  var x = myChart.addCategoryAxis("x", xAxis);
	  //x.addOrderRule(['Jan', 'Feb', 'Mar', 'Apr']);
	  x.addOrderRule("year");
	  myChart.addMeasureAxis("y", yAxis);
	  var s = myChart.addSeries(null, chartType);
	  myChart.addLegend(60, 10, 500, 20, "right");

	  // var x = myChart.addCategoryAxis("x", "Month");
	  // x.addOrderRule("Date");
	  // myChart.addMeasureAxis("y", "Unit Sales");
	  // var s = myChart.addSeries("Channel", dimple.plot.area);
	  // myChart.addLegend(60, 10, 500, 20, "right");
	  myChart.draw();
	});
}