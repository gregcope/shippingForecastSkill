Amazon Alexa skill for the UK Met office Shipping forecast
----------------------------------------------------------

##Description
A simple NodeJS skill that downloads the forecast in XML, and parses out the area the person has asked for

* Takes one area as an argument
* Downloads www.metoffice.gov.uk/public/data/CoreProductCache/ShippingForecast/Latest
* Parses XML looking for area
* Returns Forecast

##Usage (once configured)
* get shipping forecast for Viking
* Should return something like; "Viking.  Issued at 10 30UTC.  Southwesterly 7 or gale 8 in southeast at first, otherwise westerly or northwesterly 5 or 6.  Very rough at first in southeast, otherwise moderate or rough.  Rain then showers.  Moderate or good." 
* Check via the actual website: http://www.metoffice.gov.uk/public/weather/marine-shipping-forecast-printable

##Dependencies
* Internet access to get to Met Office forecast
* Met Office Forecast to be avaliable, responseive and corrrect!!!!
* xml2js node libary

##How
* Copy / hack of; https://github.com/amzn/alexa-skills-kit-js/tree/master/samples/tidePooler

##Build
1. Clone repo
2. cd src
3. hack stuff
4. zip f.zip *
5. upload to zip to AWS lambda
6. profit

##Command line
node shippingSkillXML.js "Southeast Iceland"

##Licence
GNU GPL v3

##Note about the Met office JS file
This file: http://www.metoffice.gov.uk/lib/includes/marine/gale_and_shipping_table.js is constantly giving forecasts for 1030 UTC, October 28.  Not helpfull.  The code on here: https://en.wikibooks.org/wiki/XQuery/UK_shipping_forecast WILL NOT WORK due to the met office.  They seem unable to fix it...
