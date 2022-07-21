// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');
moment().format(); 
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/:date",(req,res,next)=>{
  let date = req.params.date;
  console.log("the requested endpoint is "+date);
//unix validity checker
  if (moment(date, 'X', true).isValid()){
    res.json({
    unix:date,
      utc: moment(date, 'X', true).format()
  })
      } 
    //utc validity checker
  else if (moment(date, 'YYYY-MM-DD', true).isValid()){
    res.json({
    unix:moment(date,'YYYY-MM-DD',true).format().unix(),
      utc: moment(date, 'YYYY-MM-DD', true).format()
  })
  }
  else {
    res.json({
    error:"Invalid Date"
  })
  }
  });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
