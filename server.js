var http = require('http'),     /* require/import the HTTP module */
    fs = require('fs'), 
    url = require('url'),
    port = 8080;                /* define a port we want to listen to */

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);           //requesting and responding the complete URL

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 
    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

  var myJSON;
  if(parsedUrl.pathname == '/listings'){            // pathway is listings. pathway is the resource path part of the URL
      myJSON = JSON.stringify(listingData);       // data must be a string when sending data to a web server. Stringify converts Javascript object into a string
      response.end(myJSON);                       // print the statement on web
    }
  else{
    response.writeHead(404);
    response.end('Bad gateway error');
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

   listingData = JSON.parse(data)             //if you parse the data with json.parse(), it becomes a javascript object

   // a server is created, but not started
var server = http.createServer(requestHandler);

// the server is now started, listening for requests on port 8080
server.listen(port, function() {
  //once the server is listening, this callback function is executed
  console.log('Server listening on: http://127.0.0.1:' + port);         //print statement on terminal
});
});
//console.log('Is the server started?');

/* If error encountered, print error path. Else print stataus code 200 OK */

//request handler
// function createRequestHandle(request) {
  // body...
//  if ()
// }