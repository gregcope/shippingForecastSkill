/* 
/ A node function
/ To take one argument (a sting)
/ Look it up in a shipping forecast area list
/ and if found, go fetch the full forcaste
/ and find the relevant bit and return that (console.out)
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
  "Wight" : "14",
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
  // "Southeast Iceland" in XML
  "Southeast Iceland" : "31"
};

// some logging at kickoff
console.log('Starting shippingSkill');
// pull out the first arg to the script
area = process.argv[2];
console.log("Argument / area to look for:", process.argv[2]);

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

// alexa sends white as arg, which we need to change
if ( area.toLowerCase() == "white" ) {
  area = "Wight";
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

function callback_function(str) {

  // based on https://github.com/hubot-scripts/hubot-shipping-forecast/blob/master/src/shipping-forecast.coffee
  console.log('Parsing XML');

  var areaForecasts = [];
  var areas = {};
  var forecast = '';
  var gales = [];
  var issued = '';

  // parse XML into parser
  parser.parseString(str, function(err, results) {
   
    // get the issue time
    var issue = results['report']['issue'];
    var alexaResponse = '';

    var monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December" ];

    var re = new RegExp('(\\d{2})(\\d{2})');
    var regResults = issue.$.time.match(re);
    // split up times line 1030 as alexa tries to prounce these as one thousand and thiry
    // not ten thirty - hence the split
    var issueTime = regResults[1] + " " + regResults[2] + " UTC. ";

	var d = new Date(issue.$.date);
	issuedDate = d.getDate() + "  "+monthNames[d.getMonth()]+".  ";
    issued = issueTime + issuedDate;

    console.log('Issued: ' + issued);

	// get Gales
	gales = results['report']['gales']['shipping-area'];
	//console.log("gales: "+JSON.stringify(gales, undefined, 2)); 

    for ( var g = 0; g < gales.length; g++ ) {
	  if ( gales[g].toLowerCase() == area.toLowerCase() ) {
	    alexaResponse = "Gale warning!  ";
	  }
	}

    // get areas
    areaForecasts = results['report']['area-forecasts']['area-forecast']; 
    //console.log("forecasts: "+JSON.stringify(forecasts));

    //console.log("areaforecasts: "+JSON.stringify(areaForecasts, undefined, 2)); 

    //console.log("forecasts length is: "+forecasts.length);

    for (var i = 0; i < areaForecasts.length; i++) {
      //console.log("moooooo: "+JSON.stringify(areaForecasts[i], undefined, 2));
      //console.log("all: "+areaForecasts[i].all);
      //console.log("area: "+JSON.stringify(areaForecasts[i].area, undefined, 2));
      //console.log("area.length: "+areaForecasts[i].area.length);

      if ( areaForecasts[i].area.length == undefined ) {
	    //console.log("areaForecasts[i].area.length == undefined for area: "+ areaForecasts[i].area.main);
        if ( areaForecasts[i].area.main.toLowerCase() == area.toLowerCase() ) {
		  
		  //console.log("\n\narea" + JSON.stringify(areaForecasts[i].area, undefined, 2));
		  var newIssue = areaForecasts[i].area.$.issuetime;
		  if ( newIssue != undefined ) {
		    console.log("newIssue is: "+newIssue);
			regResults = newIssue.match(re);
			issueTime = regResults[1] + " " + regResults[2] + " UTC. ";
			console.log("IssueTime Now is: "+issueTime);

			//console.log("IssueDate is: "+areaForecasts[i].area.$.issuedate);
			var d = new Date(areaForecasts[i].area.$.issuedate);

			//console.log("Month is: " + monthNames[d.getMonth()]);
			//console.log("Date is: "+ d.getDate());

			issuedDate = d.getDate() + "  "+monthNames[d.getMonth()]+".  ";
			issued = issueTime + issuedDate;
			//console.log("issued: " + issued);
		  }

          alexaResponse = alexaResponse + areaForecasts[i].area.main 
            + '.  Issued at ' + issued 
            + areaForecasts[i].wind + ' '
            + areaForecasts[i].seastate + ' ' 
            + areaForecasts[i].weather + ' '
            + areaForecasts[i].visibility;
          console.log(alexaResponse);
        }
        // area, issue, wind, seastate, weather, visibility
      } else {
        //console.log("main that needs to be split is: " + areaForecasts[i].all);
        var main = [];
        main = areaForecasts[i].all.split(', ');
        // more than one stanza
        for (var k = 0; k < main.length; k++) {
          if ( main[k].toLowerCase() == area.toLowerCase() ) {
            //console.log("area: "+JSON.stringify(areaForecasts[i].area, undefined, 2));
            //console.log("wind: "+JSON.stringify(areaForecasts[i].area[k].wind, undefined, 2));
            alexaResponse = alexaResponse + main[k] 
              + '.  Issued at ' + issued 
              + areaForecasts[i].area[k].wind + '  ' 
              + areaForecasts[i].area[k].seastate + '  ' 
              + areaForecasts[i].area[k].weather + ' '
              + areaForecasts[i].area[k].visibility;
            console.log(alexaResponse);
          }
        }
      }
    }

  });
}

http.request(options, callback).end();
