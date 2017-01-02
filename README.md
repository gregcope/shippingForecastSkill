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
* ```cd shippingForecastSkill/src/```
* ```npm install --prefix=~/shippingForecastSkill/src xml2js```

##How
* Copy / hack of; https://github.com/amzn/alexa-skills-kit-js/tree/master/samples/tidePooler

##Build
1. Clone repo; Install above dependencies
2. cd src
3. hack stuff
4. Either zip -x build.sh -r manual.zip *
5. then upload to zip to AWS lambda, configure Alexa Skill etc...
6. Or run build.sh (see buildScript section)
7. profit

##AWS CLI code upload user (for Build script)
* Create a AWS IAM user (shippingForecastLambdaCodeUploader) - no password/groups
* Create a policy that only allows the following Actions to the specific ARN path
```{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1483377890000",
            "Effect": "Allow",
            "Action": [
                "lambda:GetFunctionConfiguration",
                "lambda:UpdateFunctionCode"
            ],
            "Resource": [
                "arn:aws:lambda:eu-west-1:517900834313:function:shippingForecast"
            ]
        }
    ]
}```
* Copy / create the access keys and configure this for AWS CLI usage

##Command line
node shippingSkillXML.js "Southeast Iceland"

##Note on Lambda run times
I see various differences in run times.  

###Curl
On the command line, getting the XML forcast takes around 60ms for first (DNS query) and 30ms for subsequent request, this curl shows DNS and total time for five rounds.  In Southern England;
```
$ for i in {1..5};do curl -s -w "%{time_namelookup}, %{time_total}\n" -o /dev/null www.metoffice.gov.uk/public/data/CoreProductCache/ShippingForecast/Latest; done
0.033, 0.059
0.005, 0.035
0.005, 0.037
0.005, 0.032
0.005, 0.031
```

###The met office uses Akamai;
```
$ dig www.metoffice.gov.uk  +noall +answer

; <<>> DiG 9.8.3-P1 <<>> www.metoffice.gov.uk +noall +answer
;; global options: +cmd
www.metoffice.gov.uk.	436	IN	CNAME	www.metoffice.gov.uk.edgesuite.net.
www.metoffice.gov.uk.edgesuite.net. 12618 IN CNAME a376.r.akamai.net.
a376.r.akamai.net.	9	IN	A	23.62.2.27
a376.r.akamai.net.	9	IN	A	23.62.3.102
```

###Lamdba run times
However Lambda run times vary allot; Which looks like a combination of startup time and DNS.  Here are a few in short succession;

####Long

```
2017-01-02T13:01:54.558Z	a25c0409-d0eb-11e6-b735-c167da284f2c	makeForecastRequest: Have HTTP response, with date in: 183ms.
REPORT RequestId: a25c0409-d0eb-11e6-b735-c167da284f2c	Duration: 816.65 ms	Billed Duration: 900 ms Memory Size: 128 MB	Max Memory Used: 30 MB	
```

####Another long

```
2017-01-02T13:01:11.911Z	88debf9b-d0eb-11e6-b09d-57f7961e841d	makeForecastRequest: Have HTTP response, with date in: 256ms.
REPORT RequestId: 88debf9b-d0eb-11e6-b09d-57f7961e841d	Duration: 770.25 ms	Billed Duration: 800 ms Memory Size: 128 MB	Max Memory Used: 25 MB	
```

####Short

```
2017-01-02T13:02:00.140Z	a5ecf354-d0eb-11e6-8eb5-95cabf63dc8a	makeForecastRequest: Have HTTP response, with date in: 20ms.
REPORT RequestId: a5ecf354-d0eb-11e6-8eb5-95cabf63dc8a	Duration: 73.97 ms	Billed Duration: 100 ms Memory Size: 128 MB	Max Memory Used: 30 MB	
```

####Another short

```
2017-01-02T13:02:26.042Z	b55cd249-d0eb-11e6-9c76-2fcbfbe789b7	makeForecastRequest: Have HTTP response, with date in: 28ms.
REPORT RequestId: b55cd249-d0eb-11e6-9c76-2fcbfbe789b7	Duration: 120.61 ms	Billed Duration: 200 ms Memory Size: 128 MB	Max Memory Used: 30 MB	
```

##Scratch notes
* Install AWS CLI on MacOSX 10.12 Sierra;
** brew install awscli
** from https://www.cyberciti.biz/faq/osx-installing-the-aws-command-line-interface-using-brew/

##Licence
GNU GPL v3

##Note about the Met office JS file
This file: http://www.metoffice.gov.uk/lib/includes/marine/gale_and_shipping_table.js is constantly giving forecasts for 1030 UTC, October 28.  Not helpfull.  The code on here: https://en.wikibooks.org/wiki/XQuery/UK_shipping_forecast WILL NOT WORK due to the met office.  They seem unable to fix it...
