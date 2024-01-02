# Update these and remove the .example in the filename.

NAME="esa"
API_NAME="esa-api"
IMAGE_TAG="some-image-tag"
TOOLS_NAMESPACE="abc123-tools"
IMAGE_NAMESPACE=$TOOLS_NAMESPACE # Default to the same as tools; could change
DEPLOY_ENV="-dev" # "-dev", "-test", or ""
DEPLOY_NAMESPACE="abc123$***REMOVED***DEPLOY_ENV:-'-prod'***REMOVED***" # if DEPLOY_ENV is "" then change it to -prod
BASE_OPENSHIFT_URL="some.openshift.deployment.url"
BASE_GATEWAY_URL="https://def456.apps.gov.bc.ca"
KEYCLOAK_URL="Keycloak URL to authenticate against"
KEYCLOAK_CLIENT_ID="The client ID on Keycloak"
KEYCLOAK_ROLE="The role the user must have"
DO_BUILD=true
