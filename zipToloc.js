var https = require("https");

//console.log(url);

function printmessage(city, state, summary){
	console.log(city +", "+ state +" forecast today"+ ":\n" + summary);

}

function getforecast(zipcode){

var url = "https://www.zipcodeapi.com/rest/H3pllowmKQ0PRZkRzRCY1ZaeRTFzRrYzvoUQMrdxhdn8cHZMzCKBCUPtOu3GW1fr/info.json/" + zipcode +"/degrees";
var request = https.get(url, function(response){
     var body = "";
     response.on('data', function(chunk){
             body += chunk;
     });
     response.on('end', function(){
     	var locInfo = JSON.parse(body);	
     	//printmessage(locInfo.city, locInfo.state);

     	var forecasturl = "https://api.forecast.io/forecast/c120a875c7be503b55d72763958bde75/"+ locInfo.lat+ "," + locInfo.lng;
     	var req = https.get(forecasturl, function(res){
     		 var weather = "";
     		 res.on('data', function(chunk1){
             weather += chunk1;
             });
             res.on('end', function(){
     			var locweather = JSON.parse(weather);	
     	        //console.log(locweather.daily.data[0],locweather.daily.summary);  
     	        printmessage(locInfo.city, locInfo.state, locweather.daily.summary);
          });
     
     	});

     });   
});

}

module.exports.getforecast = getforecast;


