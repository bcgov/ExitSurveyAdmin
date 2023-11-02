# Update these and remove the .example in the filename.

NAME="esa-api"
IMAGE_TAG="some-image-tag"
TOOLS_NAMESPACE="abc123-tools"
IMAGE_NAMESPACE=$TOOLS_NAMESPACE # Default to the same as tools; could change
DEPLOY_ENV="-dev" # "-dev", "-test", or ""
DEPLOY_NAMESPACE="abc123${DEPLOY_ENV:-'-prod'}"
BASE_GATEWAY_URL="https://def456.apps.gov.bc.ca"
BASE_OPENSHIFT_URL="some.openshift.deployment.url"
DO_BUILD=true
