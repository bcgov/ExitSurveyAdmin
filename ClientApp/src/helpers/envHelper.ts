import env from '@beam-australia/react-env'
import ***REMOVED*** KeycloakInitOptions ***REMOVED*** from 'keycloak-js'

export const routerBase = (): string => env('APP_PATH')

export const apiUrl = (): string => ***REMOVED***
  return `$***REMOVED***env('API_DOMAIN')***REMOVED***$***REMOVED***env('APP_PATH')***REMOVED***`
***REMOVED***

export const frontendUrl = (): string => ***REMOVED***
  return `$***REMOVED***env('APP_DOMAIN')***REMOVED***$***REMOVED***env('APP_PATH')***REMOVED***`
***REMOVED***

export const authRole = (): string => ***REMOVED***
  return env('AUTH_ROLE')
***REMOVED***

export const LOCATION_HREF_KEY = `esa-originating-href`

export const windowLocation = ***REMOVED***
  remove: () => localStorage.removeItem(LOCATION_HREF_KEY),
  save: () => localStorage.setItem(LOCATION_HREF_KEY, window.location.href),
  get: () => localStorage.getItem(LOCATION_HREF_KEY),
***REMOVED***

export const keycloakCreationOptions = ***REMOVED***
    //TODO: fix issue with env variables not being pulled
  /*url: env('AUTH_URL'),*/
  /*realm: env('AUTH_REALM'),*/
    /*clientId: env('AUTH_CLIENT_ID'),*/
    url: 'https://dev.loginproxy.gov.bc.ca/auth',
    realm:'standard',
    clientId: 'exit-survey-admin-4373',
***REMOVED***

export const keycloakInitOptions: KeycloakInitOptions = ***REMOVED***
  pkceMethod: 'S256',
  onLoad: undefined,
***REMOVED***

export const keycloakLoginOptions = ***REMOVED***
  redirectUri: env('APP_DOMAIN'),
  idpHint: 'idir',
  scope: env('AUTH_SCOPE'),
***REMOVED***
