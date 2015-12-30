
//Import private module ziptoloc.  
var  forecast = require("./zipToloc");

//Read ziocode from command line you input. 
var zipcode = process.argv.slice(2);

//For each zipcode, print forecast information to console.  
zipcode.forEach(forecast.getforecast);

