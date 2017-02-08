/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

console.log('abriu');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();

app.get('/resultado',function(req,resp){
	console.log('resultado');
	var Crawler = require("crawler");
	var url = require('url');
 
	var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default 
            //a lean implementation of core jQuery designed specifically for the server 
            console.log($);
			var json = JSON.stringify({ 
				title: $("title").text(), 
				html: $("html").text()
			});
			resp.contentType('application/json');
			resp.send(json);
			
        }
        done();
    }
});
c.queue('http://www.amazon.com');
});
// start server on the specified port and binding host
app.listen(3097, '10.0.0.9', function() {
  // print a message when the server starts listening
  //console.log("server starting on " + appEnv.url);
});


