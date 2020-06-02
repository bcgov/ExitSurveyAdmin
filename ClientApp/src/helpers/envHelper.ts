/* eslint-disable @typescript-eslint/camelcase */

import env from '@beam-australia/react-env'
import ***REMOVED*** WebStorageStateStore ***REMOVED*** from 'oidc-client'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../types/FixTypeLater'

export const routerBase = (): string => env('APP_PATH')

export const deploymentUrl = (): string => ***REMOVED***
  console.log(
    'deploymentUrl',
    env('APP_DOMAIN'),
    env('APP_PATH'),
    `$***REMOVED***env('APP_DOMAIN')***REMOVED***$***REMOVED***env('APP_PATH')***REMOVED***`
  )
  return `$***REMOVED***env('APP_DOMAIN')***REMOVED***$***REMOVED***env('APP_PATH')***REMOVED***`
***REMOVED***

export const getSigninRedirectOptions = (): FixTypeLater => ***REMOVED***
  console.log(window.location)
  return ***REMOVED***
    data: ***REMOVED***
      href: window.location.href
  ***REMOVED***
***REMOVED***
***REMOVED***

export const getUserManagerConfig = (): FixTypeLater => (***REMOVED***
  client_id: env('AUTH_CLIENT_ID'),
  redirect_uri: `$***REMOVED***deploymentUrl()***REMOVED***callback`,
  response_type: env('AUTH_RESPONSE_TYPE'),
  scope: env('AUTH_SCOPE'),
  authority: env('AUTH_URL'),
  silent_redirect_uri: `$***REMOVED***deploymentUrl()***REMOVED***silent_renew.html`,
  automaticSilentRenew: env('AUTH_AUTO_SILENT_RENEW'),
  filterProtocolClaims: env('AUTH_FILTER_PROTOCOL_CLAIMS'),
  loadUserInfo: env('AUTH_LOAD_USER_INFO'),
  userStore: new WebStorageStateStore(***REMOVED*** store: window.localStorage ***REMOVED***)
***REMOVED***)
