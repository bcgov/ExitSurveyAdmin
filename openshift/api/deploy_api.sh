#
# SCRIPT SETUP
#

# Colors
BOLD_RED='\033[1;31m'
BOLD_GREEN='\033[1;32m'
BOLD_PURPLE='\033[1;35m'
NO_COLOR='\033[0m'

# Helper methods to try a command and quit if it fails
yell() ***REMOVED*** echo "$***REMOVED***BOLD_RED***REMOVED***$0: $*" >&2; ***REMOVED***
die() ***REMOVED*** yell "$*"; exit 111; ***REMOVED***
try() ***REMOVED*** "$@" || die "cannot $*"; ***REMOVED***

# Helper methods to color info / success output
info() ***REMOVED*** echo "$***REMOVED***BOLD_PURPLE***REMOVED***$1$***REMOVED***NO_COLOR***REMOVED***"; ***REMOVED***
success() ***REMOVED*** echo "$***REMOVED***BOLD_GREEN***REMOVED***$1$***REMOVED***NO_COLOR***REMOVED***"; ***REMOVED***

#
#
# MAIN SHELL SCRIPT
#
#
info "Build + deploy script for ESA API"
info "----------------------------------"
echo ""


# 1. Set up variables
info "Reading variables from deploy_vars.sh..."
try source ./deploy_api_vars.sh
echo ""

# Add service account to tools from dev?
# See https://github.com/BCDevOps/devops-platform-workshops/blob/master/101-lab/content/03_deployment.md

# 2. Switch to tools project
info "Switching to tools namespace $***REMOVED***TOOLS_NAMESPACE***REMOVED***..."
try oc project $TOOLS_NAMESPACE
echo ""

# 3. Set up build config
info "Updating OpenShift build from bc-api.yaml..."
try oc process -f ./bc-api.yaml -p NAME=$NAME IMAGE_TAG=$IMAGE_TAG TOOLS_NAMESPACE=$TOOLS_NAMESPACE | try oc apply -f -
echo ""

if [ "$DO_BUILD" = true ] ; then

  # 4a. Do a local build
  info "Performing local dotnet build..."
  try dotnet build ../../ExitSurveyAdmin.csproj
  echo ""

  # 4b. Load artifact
  info "Starting OpenShift build from local artifact. This may take a while..."
  try oc start-build $NAME --from-dir=../../bin/Debug/net7.0 --wait --follow
  echo ""

else

  info "Skipping build (set DO_BUILD var to true to enable)..."
  echo ""

fi

# 5. Switch to actual project
info "Switching to project namespace $***REMOVED***DEPLOY_NAMESPACE***REMOVED***..."
try oc project $DEPLOY_NAMESPACE
echo ""

# 6. Set up deploy config
info "Updating OpenShift deployment from dc-api.yaml..."
try oc process -f ./dc-api.yaml -p NAME=$NAME IMAGE_NAME=$NAME IMAGE_TAG=$IMAGE_TAG IMAGE_NAMESPACE=$TOOLS_NAMESPACE DEPLOY_NAMESPACE=$DEPLOY_NAMESPACE BASE_OPENSHIFT_URL=$BASE_OPENSHIFT_URL | try oc apply -f -
echo ""

success "Done."
