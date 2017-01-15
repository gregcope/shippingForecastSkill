// you will need to change APP ID 
// and may need to change metURI (if it changes)

/**
 * App ID for the skill
 */
//var APP_ID = undefined;//replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';
var APP_ID = 'amzn1.ask.skill.78c18798-6711-4f41-80bb-6efc669ce296';

// this should not change (much)
var metURI = 'http://www.metoffice.gov.uk/public/data/CoreProductCache/ShippingForecast/Latest';

//
// Do not change anything below here!!!!!
//

//arn:aws:lambda:eu-west-1:517900834313:function:shippingForecast

// HTTP client module
var http = require('http');
// XML parser module
var xml2js = require ('xml2js');
// Actual parser object
var parser = new xml2js.Parser({explicitArray : false});

// cache global vars, one to hold the content, the other to hold the time
var xmlString = '';
var xmlStringMillisecsSinceEpoc = 0;

// hopefully the months of the year will not change much
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

var doubleBarrelledAreas = {
  "north utsire" : "2",
  "south utsire" : "3",
  "german bight" : "10",
  "irish sea" : "23",
  "fair isle" : "29",
  "southeast iceland" : "31"
};


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * ShippingForecast is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ShippingForecast = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ShippingForecast.prototype = Object.create(AlexaSkill.prototype);
ShippingForecast.prototype.constructor = ShippingForecast;

// ----------------------- Override AlexaSkill request and intent handlers -----------------------

ShippingForecast.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

ShippingForecast.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleWelcomeRequest(response);
};

ShippingForecast.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

/**
 * override intentHandlers to map intent handling functions.
 */
ShippingForecast.prototype.intentHandlers = {
    "OneshotForecastIntent": function (intent, session, response) {
        handleOneshotForecastRequest(intent, session, response);
		console.timeEnd('Skill-elapsed');
    },

    "DialogForecastIntent": function (intent, session, response) {
        // Determine if this turn is for an area, or an error.
        // We could be passed slots with values, no slots, slots with no value.
        var areaSlot = intent.slots.Area;
        if (areaSlot && areaSlot.value) {
            handleAreaDialogRequest(intent, session, response);
        } else {
            handleNoSlotDialogRequest(intent, session, response);
        }
		console.timeEnd('Skill-elapsed');
    },

    "SupportedAreasIntent": function (intent, session, response) {
        handleSupportedAreasRequest(intent, session, response);
		console.timeEnd('Skill-elapsed');
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        handleHelpRequest(response);
		console.timeEnd('Skill-elapsed');
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
		console.timeEnd('Skill-elapsed');
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
		console.timeEnd('Skill-elapsed');
    }
};

// -------------------------- ShippingForecast Domain Specific Business Logic --------------------------

// an object of all the shipping areas
// so that we can parse the response
var AREAS = {
  "viking" : "1",
  "north utsire" : "2",
  "south utsire" : "3",
  "forties" : "4",
  "cromarty" : "5",
  "forth" : "6",
  "tyne" : "7",
  "dogger" : "8",
  "fisher" : "9",
  "german bight" : "10",
  "humber" : "11",
  "thames" : "12",
  "dover" : "13",
  "white" : "14",
  "portland" : "15",
  "plymouth" : "16",
  "biscay" : "17",
  "trafalgar" : "18",
  "fitzroy" : "19",
  "sole" : "20",
  "lundy" : "21",
  "fastnet" : "22",
  "irish sea" : "23",
  "shannon" : "24",
  "rockall": "25",
  "malin" : "26",
  "hebrides" : "27",
  "bailey" : "28",
  "fair isle" : "29",
  "faeroes" : "30",
  "southeast iceland" : "31"
};

function handleWelcomeRequest(response) {
    var whichAreaPrompt = "Which area would you like forecast information for?",
        speechOutput = {
            speech: "<speak>Welcome to Shipping Forecast. "
                + whichAreaPrompt
                + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        },
        repromptOutput = {
            speech: "I can lead you through providing a Shipping Area"
                + "to get forecast information, "
                + "or you can simply open Shipping Forecast and ask a question like, "
                + "get forecast information for White"
                + "For a list of supported area, ask what areas are supported."
                + whichAreaPrompt,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

    response.ask(speechOutput, repromptOutput);
	console.timeEnd('Skill-elapsed');
}

function handleHelpRequest(response) {
    var repromptText = "Which area would you like forecast information for?";
    var speechOutput = "I can lead you through providing a area "
        + "to get forecast information, "
        + "or you can simply open Shipping Forecast and ask a question like, "
        + "get forecast information for White. "
        + "For a list of supported areas, ask what areas are supported. "
        + "Or you can say exit. "
        + repromptText;

    response.ask(speechOutput, repromptText);
	console.timeEnd('Skill-elapsed');
}

/**
 * Handles the case where the user asked or for, or is otherwise being with supported cities
 */
function handleSupportedAreaequest(intent, session, response) {
    // get Areas re-prompt
    var repromptText = "Which Area would you like forecast information for?";
    var speechOutput = "Currently, I know forecast information for these Areas: " + getAllAreasText()
        + repromptText;

    response.ask(speechOutput, repromptText);
    console.timeEnd('Skill-elapsed');
}

/**
 * Handles the dialog step where the user provides an area
 */
function handleAreaDialogRequest(intent, session, response) {

    var areaNumber = getAreaStationFromIntent(intent, false),
        repromptText,
        speechOutput;
    if (areaNumber.error) {
        repromptText = "Currently, I know forecast information for these Areas: " + getAllAreasText()
            + "Which Area would you like forecast information for?";
        // if we received a value for the incorrect area, repeat it to the user, otherwise we received an empty slot
        speechOutput = area ? "I'm sorry, I don't have any forecast for " + area + ". " + repromptText : repromptText;
        response.ask(speechOutput, repromptText);
        return;
    }
}

/**
 * Handle no slots, or slot(s) with no values.
 * In the case of a dialog based skill with multiple slots,
 * when passed a slot with no value, we cannot have confidence
 * it is the correct slot type so we rely on session state to
 * determine the next turn in the dialog, and reprompt.
 */
function handleNoSlotDialogRequest(intent, session, response) {
    if (session.attributes.area) {
        // get date re-prompt
        var repromptText = "Please try again saying a shipping area, for example, Dover. ";
        var speechOutput = repromptText;

        response.ask(speechOutput, repromptText);
    } else {
        // get city re-prompt
        handleSupportedCitiesRequest(intent, session, response);
    }
}

/**
 * This handles the one-shot interaction, where the user utters a phrase like:
 * 'Alexa, open Shipping Forecast and get forecast information for White'.
 * If there is an error in a slot, this will guide the user to the dialog approach.
 */
function handleOneshotForecastRequest(intent, session, response) {

    // Determine area, using default if none provided
    var area = getAreaFromIntent(intent, true),
        repromptText,
        speechOutput;
    console.log("handleOneshotForecastRequest: area: "+area.area);
    if (area.error) {
        // invalid Area. move to the dialog
        repromptText = "Currently, I know forecast information for these Areas: " + getAllAreasText()
            + "Which Area would you like forecast information for?";
        // if we received a value for the incorrect Area, repeat it to the user, otherwise we received an empty slot
        speechOutput = area ? "I'm sorry, I don't have any forecast for " + area + ". " + repromptText : repromptText;

        response.ask(speechOutput, repromptText);
        return;
    }

    // all slots filled, either from the user or by default values. Move to final request
    getFinalForecastResponse(area.area, response);
}

/**
 * Both the one-shot and dialog based paths lead to this method to issue the request, and
 * respond to the user with the final answer.
 */
function getFinalForecastResponse(area, response) {

    // Issue the request, and respond to the user
    console.log("getFinalForecastResponse: looking for area: "+area);
    makeForecastRequest(area, function forecastResponseCallback(err, ForecastResponse) {
        var speechOutput;

        if (err) {
            speechOutput = "Sorry, the Met Office website is having a problem. Please try again later";
        } else {
            console.log("getFinalForecastResponse: ForecastResponse is: "+ForecastResponse);
            speechOutput = ForecastResponse;
            //speechOutput = date.displayDate + " in " + cityStation.city + ", the first high forecast will be around "
            //    + ", and will peak at about " + highForecastResponse.secondHighForecastHeight + ".";
        }
        response.tellWithCard(speechOutput, "ShippingForecast", speechOutput)

		console.timeEnd('Skill-elapsed');
    });
}

/**
 * Check the xmlString is not empty and it's last fetch time
 * return true if use cache, else return false
 */

function useCache() {

    // check string not empty (it will be on first run)
    if ( xmlString != '' ) {

	    // if not empty, check its millisecsSinceLastFetch
        //console.log("useCache: xmlString not empty, checking xmlString time");
        var millisecsSinceEpoc = new Date().getTime();
        var millisecsSinceLastFetch = millisecsSinceEpoc - xmlStringMillisecsSinceEpoc;
        // 1000 * 5 * 60 = 300000 (number millisecs in 5 mins)
        if ( millisecsSinceLastFetch < 300000 ) {

		    // fresh (less than timeout)
            console.log("useCache: millisecsSinceLastFetch only: "+millisecsSinceLastFetch+"ms - less than 5 mins old lets use that!");
            // so lets use this one
            return true;
        } else {

		    // old
            console.log("useCache: millisecsSinceLastFetchs old: "+millisecsSinceLastFetch+"ms , not using cached version");
            // bit old/manky, need to go fetch a new one
            return false;
        }
    } else {

	    // no cache/string empty
        console.log("useCache: Cache/xmlString empty");
        // need to go get fetch a puppy!!!
        return false;
    }
}

/**
 * parsexmlString for forecast
 */

function parseXML(area, forecastResponseCallback) {

  var alexaReply = '';
  // function to parse XML (cached or fetched) for area forecast

  // reset Alexa white to Wight
  if ( area.toLowerCase() == "white" ) {
    console.log("makeForecastRequest: area is white, changing to Wight");
    area = "Wight";
  }

  // uncomment for XML debug
  //console.log("parseXML: xmlString is: "+xmlString+". area: "+area);
  console.timeEnd('Skill-elapsed');

  var areaForecasts = [];
  var areas = {};
  var forecast = '';
  var gales = [];
  var issued = '';

  // parse XML into parser
  console.log("parseXML: parser.parseString starting");
  console.timeEnd('Skill-elapsed');

  // parse the xmlString, which we assume at this point to be either
  // fresh enough (ie useCache true)
  // or refreshed
  // TODO: Cache the parsed string, however no point as present execution time, 70ms approx, is below the lambda min of 100ms
  parser.parseString(xmlString, function(err, results) {

    console.log("parseXML: parser.parseString done.");
    console.timeEnd('Skill-elapsed');
    // get the issue time
    var issue = results['report']['issue'];
    // get issue string
	issued = returnIssuedString(issue.$.time, issue.$.date);

    //console.log("parseXML: about to check for gales");
    // get Gale warnings
    gales = results['report']['gales']['shipping-area'];
    //console.log("parseXML: gales: "+JSON.stringify(gales, undefined, 2));

    // are the some gales!
	if ( gales != undefined ) {
      // see if our area is in the list of gales!
      for ( var g = 0; g < gales.length; g++ ) {
        if ( gales[g].toLowerCase() == area.toLowerCase() ) {
          // Ops it is!!! Add it to the reply
          alexaReply = "Gale warning!  ";
          console.log("makeForecastRequest: Gale warning for: "+area);
        }
      }
    }
    // get areas
    areaForecasts = results['report']['area-forecasts']['area-forecast'];
    // iterate over the parsed response, looking for the area
    //console.log("parseXML: gale check done, about to loop looking for forecast");
    //console.timeEnd('Skill-elapsed');

    // TODO: This for loop should now be a while loop with a break
    //       to save some compute time...
    //
    for (var i = 0; i < areaForecasts.length; i++) {
      // as the met office gives condensed forecasts
      // you need to parse for two sorts of responses
      // firstly the singular response
      if ( areaForecasts[i].area.length == undefined ) {
          
        // singular forecast ..

	    //console.log("parseXML: Found singlar forecast");
        //console.timeEnd('Skill-elapsed');
        if ( areaForecasts[i].area.main.toLowerCase() == area.toLowerCase() ) {
            
		  // singular forecast mastches the one we want!!!
		  // lets make a response
		  var newIssue = '';

		  console.log('parseXML: Singluar forecast Match for area: '+area+', done is: '+done);
		  try {
            newIssue = areaForecasts[i].area.$.issuetime;
          }
		  catch(err) {
		    newIssue = undefined;
		  }

	      // does this forecast have its own issue date
		  // like trafalgar usually has
		  // if so overload
          if ( newIssue != undefined ) {
              
	  	    // new issued time/date to overload
	        issued = returnIssuedString(newIssue, areaForecasts[i].area.$.issuedate);
          }
          // put response together now!!!
          alexaReply = alexaReply + areaForecasts[i].area.main
            + '.  Issued at ' + issued
            + areaForecasts[i].wind + '  '
            + areaForecasts[i].seastate + '  '
            + areaForecasts[i].weather + '  '
            + areaForecasts[i].visibility;
        }
      } else {
        // okay - so it is multidemensional response
        // so we need to split it
        var main = [];
        main = areaForecasts[i].all.split(', ');
        //console.log("parseXML: looking at multidemensional forecast");
        //console.timeEnd('Skill-elapsed');
		var done = false;
        for (var k = 0; k < main.length; k++) {
		  //console.log('parseXML: sub area: '+main[k]);
          
		  // check its not a slit one
          var areaToLookFor = checkSplitForecast(main[k]);
          //console.log('parseXML: areaToLookFor is now: '+areaToLookFor);

		  // check what we have
          if ( areaToLookFor.toLowerCase() == area.toLowerCase() ) {
            // match!!!!

			// also lets make sure we do not double match
			// make done true on first match as they
			// are both the same
			console.log('parseXML: multiforecast, Match for area: '+area+', done is: '+done);
			if ( done != true ) {
			
			  done = true;
              console.log("parseXML: match, done var is now: "+done);
              alexaReply = alexaReply + areaToLookFor
                + '.  Issued at ' + issued
                + areaForecasts[i].area[k].wind + '   '
                + areaForecasts[i].area[k].seastate + '   '
                + areaForecasts[i].area[k].weather + '  '
                + areaForecasts[i].area[k].visibility;
			}
          }
        }
      }
    }
	// we have a reply
	console.log('parseXML: forecast found is: '+alexaReply);
    console.timeEnd('Skill-elapsed');
  });
 
  // we should have a reponse to send
  forecastResponseCallback(null, alexaReply);
}

/**
 *
 * Function to look for an split area
 * returns the area to look for (ie splits it, if it is a split one
 * e.g. East Wight would return Wight
 * but South Utsire would not as it is a proper area 
 */

function checkSplitForecast(area) {

   // check it is not a normal bouble barrel before regexing
   if ( doubleBarrelledAreas[area.toLowerCase()] ) {
	 // looks like a legit double barrel area
     //console.log('checkSplitForecast: Double barrel match: '+area);
	 return area;

   } else {
     // regex it for a space
     var re = new RegExp('(.*) (.*)');
	 var regResults = area.match(re);
	 // check it has a match
	 if ( regResults != null ) {

       // it is a match for a space, and not an offical double barreled area
	   // so should be something like "East Wight"
	   // Grab the end, and return that as the area
	   
	   //console.log("checkSplitForecast: areas is: "+area+", split so returning: "+regResults[2]); 
	   // return 2nd string which should be just area
	   return regResults[2];
	 } else {     
	   // no regex match for space
	   // therefore a single name
	   // return unchanged
	   return area;
	 }
   }
}

/**
 * Function to return the issued string in the correct format
 * takes a string
 * Returns a nice Issued string for Alexa to say
 * splits up the time into two blocks
 * Adds UTC
 * Adds day suffix (e.g. 12th)
 * Turns Month number into Month long name
 * sticks it all togethernow...
 */
function returnIssuedString(time, date) {

  var issued = '';
  var re = new RegExp('(\\d{2})(\\d{2})');
  var regResults = time.match(re);
  var issueTime = regResults[1] + " " + regResults[2] + " U T C.  ";
  
  // get the date
  var d = new Date(date);
  // turn Month number back into Month name with suffix
  var issuedDate = dateWithSuffix(d.getDate()) + " of "+monthNames[d.getMonth()]+".  ";
  // string it all together now...
  issued = issueTime + issuedDate;
  //console.log('returnIssuedString: Issued: ' + issued);
  return issued;
}


/**
 * Fetch the Met Office XML file
 * http://www.metoffice.gov.uk/public/data/CoreProductCache/ShippingForecast/Latest
 */
function makeForecastRequest(area, forecastResponseCallback) {

    if ( useCache() ) {

	    console.log("makeForecastRequest: Going to use cached, xmlString");
	    parseXML(area, forecastResponseCallback);
	    // use the cached one
	} else {
	  // we need to go HTTP GET a new one and refresh xmlString !!!!!

	  console.time('http-request');
	  http.get(metURI, function (res) {
	    var metResponseString = '';
		console.log('makeForecastRequest: HTTP response for Status Code: '+res.statusCode+', for: '+metURI);
		console.timeEnd('http-request');

        // if for some reason we did not get a HTTP 200 OK
		if (res.statusCode != 200) {
		  forecastResponseCallback(new Error("makeForecastRequest: Non 200 Response for: "+metURI));
		  console.timeEnd('http-request');
		}

        // got some more data to append
        res.on('data', function (data) {
		  metResponseString += data;
		});

        // in theory finished!
		res.on('end', function () {
          // should have a sensible result
		  xmlStringMillisecsSinceEpoc = new Date().getTime();
		  xmlString = metResponseString;
		  console.log("makeForecastRequest: res.on done");
          console.timeEnd('http-request');
		  parseXML(area, forecastResponseCallback);
       });
	 }).on('error', function (e) {
	   console.time('http-request');
	   console.log("Communications error: " + e.message);
	   forecastResponseCallback(new Error(e.message));
	 });
  }
}

/**
 * Gets the area from the intent, or returns an error
 */
function getAreaFromIntent(intent, assignDefault) {

    var areaSlot = intent.slots.area;
    // slots can be missing, or slots can be provided but with empty value.
    // must test for both.
    console.log("getAreaFromIntent: areaSlot.value is: "+areaSlot.value);
    if (!areaSlot || !areaSlot.value) {
        console.log("getAreaFromIntent: areaSlot or areaSlot.value undefined");
        if (!assignDefault) {
            console.log("getAreaFromIntent: assignDefault is false");
            return {
                error: true
            }
        } else {
            console.log("getAreaFromIntent: returing default area: wight");
            // For sample skill, default to White.
             return {
                area: 'wight'
            }
        }
    } else {
        // lookup the area
        var areaName = areaSlot.value;
        console.log("getAreaFromIntent: Looking for: "+areaSlot.value);
        if (AREAS[areaName.toLowerCase()]) {
            console.log("getAreaFromIntent found: "+areaName.toLowerCase());
            return {
                area: areaName.toLowerCase()
                //areaNumber: AREAS[areaName.toLowerCase()]
            }
        } else {
            console.log("getAreaFromIntent did not find: "+areaName.toLowerCase());
            return {
                error: true,
                area: areaName.toLowerCase()
            }
        }
    }
}

//
// create a list of all the areas
//
function getAllAreasText() {
    var areaList = '';
    for (var area in AREAS) {
        areaList += area + ", ";
    }

    return areaList;
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var shippingForecast = new ShippingForecast();

    // grab a some time data
	console.time('Skill-elapsed');
	// do the thing
    shippingForecast.execute(event, context);
};

//
// Function to return date with suffix
// shameless stolen from; http://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
//
function dateWithSuffix(i) {
  var j = i % 10,
  k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}
