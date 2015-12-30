
//var http = require('http');
var ziptoloc = require("./ziptoloc");
//var zipcode  = "10024";
var zipcode = process.argv.slice(2);
zipcode.forEach(ziptoloc.getforecast);
//console.log(process);
