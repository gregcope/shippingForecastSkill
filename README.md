Amazon Alexa skill for the UK Met office Shipping forecast
----------------------------------------------------------

##Description
A simple NodeJS skill that downloads the forecast in JS, and parses out the area the person has asked for

* Takes one area as an argument
* Downloads http://www.metoffice.gov.uk/lib/includes/marine/gale_and_shipping_table.js
* regex's out the relevant area
* returns Forecast

##How
Copy / hack of; https://github.com/amzn/alexa-skills-kit-js/tree/master/samples/tidePooler

##Build
# Clone repo
# cd src
# <hack files>
# zip f.zip *
# upload to zip to AWS lambda
# profit

##Command line
node shippingSkill.js "South east Iceland"

##Licence
GNU GPL v3
