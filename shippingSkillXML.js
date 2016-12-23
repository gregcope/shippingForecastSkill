/* 
/ A node function
/ To take one argument (a sting)
/ Look it up in a shipping forecast area list
/ and if found, go fetch the full forcaste
/ and find the relevant bit and return that
/
/ <Greg Cope> greg.cope@gmail.com
/ 08-Dec-2016 Initial version
/ 15-Dec-2016 Working version with comments
/ 17-Dec-2016 See Github repo for updates/versions
/ https://github.com/gregcope/shippingForecastSkill
*/

// Global Variables to use
var xml2js = require ('xml2js');
//var parser = new xml2js.Parser();
var parser = new xml2js.Parser({explicitArray : false});

// areas/numbers
var areaNumber = '';
var area = '';

// XML Forecast, so 1990's..
var metHost = 'www.metoffice.gov.uk';
var metPath = '/public/data/CoreProductCache/ShippingForecast/Latest';

// string for HTTP response
var str = '';

// forcast object and alexaReply string
var f = '';
var alexaReply = '';

// an object of all the shipping areas
// so that we can parse the response
var areaCodeMap = {
  "Viking" : "1",
  "North Utsire" : "2",
  "South Utsire" : "3",
  "Forties" : "4",
  "Cromarty" : "5",
  "Forth" : "6",
  "Tyne" : "7",
  "Dogger" : "8",
  "Fisher" : "9",
  "German Bight" : "10",
  "Humber" : "11",
  "Thames" : "12",
  "Dover" : "13",
  "White" : "14",
  "Portland" : "15",
  "Plymouth" : "16",
  "Biscay" : "17",
  "Trafalgar" : "18",
  "FitzRoy" : "19",
  "Sole" : "20",
  "Lundy" : "21",
  "Fastnet" : "22",
  "Irish Sea" : "23",
  "Shannon" : "24",
  "Rockall": "25",
  "Malin" : "26",
  "Hebrides" : "27",
  "Bailey" : "28",
  "Fair Isle" : "29",
  "Faeroes" : "30",
  // This is actually "South-east Iceland" in the JS file
  "South east Iceland" : "31"
};

// some logging at kickoff
console.log('Starting shippingSkill');
console.log("Argument / area to look for:", process.argv[2]);

// pull out the first arg to the script
area = process.argv[2];

// check for an argument
if ( area == undefined ) {
  // no argument?
  console.log("Sorry I cannot do that Dave: no area defined!");
  process.exit(1);
} 

// we have at least one argument to check
if ( areaNumber = areaCodeMap[area] ) {
  // try looking up in list
  console.log("Looking for area: '" + area + "', which is number: " + areaNumber);
} else {
  // oh - not in list
  console.log("Sorry, I cannot do that Dave.  Cannot find area:",area,", in my shipping area list.  Please try again");
  process.exit(2);
}

// If we got this far we have found a shipping forecast area
// in the list, and we are good to go and HTTP get the forecast
// and regex for the bit we want

// install http module
var http = require('http');

// http options to create a URI
var options = {
  host: metHost,
  path: metPath
};

// do the HTTP reqest
callback = function(response) {
  console.log('Getting: %s%s', metHost,metPath);
  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
//    metArr += chunk;
  });

  // The whole HTTP response has been recieved, so regex it and reply
  response.on('end', function () {
    console.log('got response');
    callback_function(str);
  });
}

// callback to do stuff when we have a response
// TODO Timeout
// TODO error trap (503/404)
function callback_function(str) {

  // based on https://github.com/hubot-scripts/hubot-shipping-forecast/blob/master/src/shipping-forecast.coffee
  console.log('Parsing XML');

  var forecasts = '';
  var areas = [];
  var forecast = '';

  // parse XML into parser
  parser.parseString(str, function(err, results) {
   
  //console.log(JSON.stringify(results));

  // get the issue time
  var issue = results['report']['issue'];

  var re = new RegExp('(\\d{2})(\\d{2})');
  var regResults = issue.$.time.match(re);
  // split up times line 1030 as alexa tries to prounce these as one thousand and thiry
  // not ten thirty - hence the split
  var issueTime = regResults[1] + " " + regResults[2] + " UTC.";
  
  console.log('Issue time is: ' + issueTime);

  // get areas
  //forecasts = results['report']['area-forecasts']['area-forecast']; 
  //console.log("forecasts: "+JSON.stringify(forecasts));

  //console.log("areaforecast: "+JSON.stringify(forecasts, undefined, 2)); 

  //console.log("forecasts length is: "+forecasts.length);

  //for (var i = 0; i < forecasts.length; i++) {
  //  var area = forecast[i];
  //  console.log(area.main);
  });


  // build the text response, assuming it is all cushty
  // TODO error trapping like area not there
  //f = foreCast(str, areaNumber);
  //alexaReply = f.area() + '.  Issued at ' +f.time() + 'UTC.  ' + f.wind() + '  ' + f.seastate() + '  ' + f.weather() + '  ' + f.visibility();
  //console.log(alexaReply);
}

// function to regex the http response
// looking for parts of the shipping forcast, by areaNumber
// each return, returns text, no quotes
// got from https://code.tutsplus.com/tutorials/you-dont-know-anything-about-regular-expressions-a-complete-guide--net-7869
function foreCast(str, areaNumber) {
  console.log("Looking for area: '",areaNumber,"'");
  //console.log("in string: '",str,"'");
  return {
    area : function() {
      var re = new RegExp('area\\[' + areaNumber + '\\] = \\"(.*)\\"');
      var regResults = str.match(re);
      return regResults[1];
    },
    wind : function() {
      // wind[14] = "Southerly or southwesterly 4 or 5, occasionally 6 at first.";
      // console.log("in wind function");
      var re = new RegExp('wind\\[' + areaNumber + '\\] = \\"(.*)\\"');
      //console.log(re);
      var regResults = str.match(re); 
      //console.log(regResults[1]);
      return regResults[1];
    },
    weather : function() {
      // weather[14] = "Rain later.";
      // console.log("in weather function");
      var re = new RegExp('weather\\[' + areaNumber + '\\] = \\"(.*)\\"');
      var regResults = str.match(re);
      return regResults[1];
    },
    visibility : function() {
      // visibility[14] = "Moderate or good.";
      // console.log("in visibility function");
      var re = new RegExp('visibility\\[' + areaNumber + '\\] = \\"(.*)\\"');
      var regResults = str.match(re);
      return regResults[1];
    },
    seastate : function () {
      // seastate[14] = "Slight or moderate.";
      // console.log("in seastate function");
      var re = new RegExp('seastate\\[' + areaNumber + '\\] = \\"(.*)\\"');
      var regResults = str.match(re);
      return regResults[1];
    },
    time : function () {
      // shipIssueTime[21] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
      var re = new RegExp('shipIssueTime\\[' + areaNumber + '\\] = \\"(\\d{4}).*\\"');
      var regResults = str.match(re);
      return regResults[1];
    }
  }
}

http.request(options, callback).end();
