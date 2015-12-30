//Import module https 
var https = require("https");

//Print forecast information
function printmessage(city, state, temmin, temmax, humidity, windSpeed, summary){
    console.log(city +", "+ state + ":\n" + "Temperature: " + temmin+ "°F to " + temmax + 
        "°F Humidity: "+ humidity + " Windspeed: "+ windSpeed +"\nSummary: "+summary);

}

//Print error message
function printError(error){
   console.error(error.message);
}


function getforecast(zipcode){

//Send a request to https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>
// to get city, state, latitude, longitude etc from zip code. 

var url = "https://www.zipcodeapi.com/rest/H3pllowmKQ0PRZkRzRCY1ZaeRTFzRrYzvoUQMrdxhdn8cHZMzCKBCUPtOu3GW1fr/info.json/" + zipcode +"/degrees";

     var request = https.get(url, function(response){
     var body = "";
     //get data
     response.on('data', function(chunk){
             body += chunk;
     });

     response.on('end', function(){
     	 var locInfo = JSON.parse(body);	
        //Send a request to api.forecast.io to get weather information from latitude, longitude. 
         var forecasturl = "https://api.forecast.io/forecast/c120a875c7be503b55d72763958bde75/"+ locInfo.lat+ "," + locInfo.lng;
         var req = https.get(forecasturl, function(res){
             var weather = "";
             //get data
             res.on('data', function(chunk1){
             weather += chunk1;
             });
             //Show wether information
             res.on('end', function(){
                var locweather = JSON.parse(weather);   
                var WeatherToday = locweather.daily.data[0];  
                printmessage(locInfo.city, locInfo.state, WeatherToday.temperatureMin,
                WeatherToday.temperatureMax,WeatherToday.humidity, WeatherToday.windSpeed, WeatherToday.summary);
            });
             
        req.on('error', printError);
        });
	

     });   
});

request.on('error', printError);
}

 module.exports.getforecast = getforecast;

