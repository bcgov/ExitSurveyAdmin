/* eslint-disable @typescript-eslint/camelcase */

import env from '@beam-australia/react-env'
import ***REMOVED*** WebStorageStateStore ***REMOVED*** from 'oidc-client'

export const routerBase = (): string => env('APP_PATH')

export const apiUrl = (): string => ***REMOVED***
  return `$***REMOVED***env('API_DOMAIN')***REMOVED***$***REMOVED***env('APP_PATH')***REMOVED***`
***REMOVED***

export const frontendUrl = (): string => ***REMOVED***
  return `$***REMOVED***env('APP_DOMAIN')***REMOVED***$***REMOVED***env('APP_PATH')***REMOVED***`
***REMOVED***

export const signinRedirectOptions = ***REMOVED***
  data: ***REMOVED***
    href: window.location.href
***REMOVED***
  // extraQueryParams: ***REMOVED***
  //   kc_idp_hint: 'idir'
  // ***REMOVED***
***REMOVED***

export const userManagerConfig = ***REMOVED***
  client_id: env('AUTH_CLIENT_ID'),
  redirect_uri: `$***REMOVED***frontendUrl()***REMOVED***/#/callback`,
  response_type: env('AUTH_RESPONSE_TYPE'),
  scope: env('AUTH_SCOPE'),
  authority: env('AUTH_URL'),
  // silent_redirect_uri: `$***REMOVED***deploymentUrl()***REMOVED***silent_renew.html`,
  automaticSilentRenew: env('AUTH_AUTO_SILENT_RENEW'),
  filterProtocolClaims: env('AUTH_FILTER_PROTOCOL_CLAIMS'),
  loadUserInfo: env('AUTH_LOAD_USER_INFO'),
  userStore: new WebStorageStateStore(***REMOVED*** store: window.localStorage ***REMOVED***)
***REMOVED***
