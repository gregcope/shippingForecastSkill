#!/bin/sh

#
# Horrid hacky Lambda build / upload thingy
# Ugly ugly thing to save some time (keep forgetting to upload / save)
# please no not reuse as it is too ugly
#

# Requires AWS CLI installed
# Required AWS Access key with permission to upload / describe Lamdba functions Only

echo "$0 Starting build ..."

# commit this build
git commit -am "build commit: `date +%s`"

zip -x $0 manual.zip -r build.zip *

aws lambda update-function-code --function-name shippingForecast --zip-file fileb://build.zip

echo "$0 Done."
