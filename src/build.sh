#!/bin/sh

#
# Horrid hacky Lambda build / upload thingy
# Ugly ugly thing to save some time (keep forgetting to upload / save)
# please no not reuse as it is too ugly
#

# Requires AWS CLI installed
# Required AWS Access key with permission to upload / describe Lamdba functions Only

echo "$0 Starting build ..."

zip -x $0 -r f.zip *

echo "$0 Done."
