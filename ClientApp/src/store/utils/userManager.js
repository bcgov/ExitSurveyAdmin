/* eslint-disable @typescript-eslint/camelcase */

import ***REMOVED*** createUserManager ***REMOVED*** from 'redux-oidc'
import ***REMOVED*** WebStorageStateStore ***REMOVED*** from 'oidc-client'

const userManagerConfig = ***REMOVED***
  client_id: 'ExitSurveyAdmin',
  redirect_uri: `$***REMOVED***window.location.protocol***REMOVED***//$***REMOVED***window.location.hostname***REMOVED***$***REMOVED***
    window.location.port ? `:$***REMOVED***window.location.port***REMOVED***` : ''
***REMOVED***/callback`,
  response_type: 'code',
  scope: 'openid profile resourceApi',
  authority: 'https://sso-dev.pathfinder.gov.bc.ca/auth/realms/ytaqhqia',
  silent_redirect_uri: `$***REMOVED***window.location.protocol***REMOVED***//$***REMOVED***
    window.location.hostname
***REMOVED***$***REMOVED***window.location.port ? `:$***REMOVED***window.location.port***REMOVED***` : ''***REMOVED***/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore(***REMOVED*** store: window.localStorage ***REMOVED***)
***REMOVED***

const userManager = createUserManager(userManagerConfig)

export default userManager
