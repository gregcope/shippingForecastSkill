Amazon Alexa skill for the UK Met office Shipping forecast
----------------------------------------------------------

##Description
A simple NodeJS skill that downloads the forecast in XML, and parses out the area the person has asked for

* Takes one area as an argument (e.g. Dover)
* Downloads www.metoffice.gov.uk/public/data/CoreProductCache/ShippingForecast/Latest
* Parses XML looking for area
* Returns Forecast

##Features
* Will give gale Warning if area has a warning
* Adds the correct date suffix (st,nd,th etc...)
* Gives correct issue time and date, even for areas that sometimes have thier own seperate ones (e.g. Trafalgar)

##TODO
* Give synopsis
* Give a forecast, at sessionStart

##Usage (once configured)
* "Get shipping forecast for Trafalgar."
* Should return something like; "Trafalgar.  Issued at 00 15 U T C.  25  December.  In south, easterly 5 to 7, occasionally gale 8 at first.  In north, variable 4.  In south, moderate or rough.  in north, moderate or rough, occasionally very rough at first.  In south, fair.  In north, occasional drizzle.  In south, good.  In north, good, occasionally poor."
* Check via the actual website: http://www.metoffice.gov.uk/public/weather/marine-shipping-forecast-printable

##Dependencies
* Internet access to get to Met Office forecast!!!
* Met Office Forecast to be avaliable, responseive and corrrect!!!!
* xml2js node libary
* cd shippingForecastSkill/src/
* npm install --prefix=~/shippingForecastSkill/src xml2js

##How
* Copy / hack of; https://github.com/amzn/alexa-skills-kit-js/tree/master/samples/tidePooler

##Build
1. Clone repo
2. cd src
3. hack stuff
4. zip f.zip *
5. upload to zip to AWS lambda, configure Alexa Skill etc...
6. profit

##Command line
node shippingSkillXML.js "Southeast Iceland"

##Licence
GNU GPL v3

##Note about the Met office JS file
This file: http://www.metoffice.gov.uk/lib/includes/marine/gale_and_shipping_table.js is constantly giving forecasts for 1030 UTC, October 28.  Not helpfull.  The code on here: https://en.wikibooks.org/wiki/XQuery/UK_shipping_forecast WILL NOT WORK due to the met office.  They seem unable to fix it...
