// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/docs/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
/*
Things to add:
1) regex to check timestamp format
 ---> - Filter unix time or UTC time
3) Regex...Limit the utc timestamp to stop at GMT
*/
app.get('/api/timestamp/:date_string?',
  function(req,res,next){
    if (req.params.date_string){
      //test for unix/utc up here and filter accordingly
      let utc = req.params.date_string.includes("-");
      if (utc) {
        let regexUTC = /\d{4}-{1}(\d{2}|\d{1})-{1}(\d{2}|\d{1})/g;
        let properFormat = regexUTC.test(req.params.date_string);
          if (properFormat){
            req.time = new Date(req.params.date_string).toString();
          } else {req.time = "Invalid Date"}
      } else { //unix
        req.time = new Date(req.params.date_string*1000);
    }
  } else { //if there is no time sent send current time
      req.time = new Date().toString();
    }
    next();
  },function(req,res){
    let time = new Date(req.time);
    let unix = time.getTime();
    let test = req.time.toString();
    let test2 = test.split("-");
    res.json({'unix': unix, 'utc': test2[0]})
  });
// listen for requests :)
var listener = app.listen("3000", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
