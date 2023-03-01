import env from '@beam-australia/react-env'
import ***REMOVED*** KeycloakInitOptions ***REMOVED*** from 'keycloak-js'

export const routerBase = (): string => env('APP_PATH')

export const apiUrl = (): string => ***REMOVED***
  return `$***REMOVED***env('API_DOMAIN')***REMOVED***$***REMOVED***env('APP_PATH')***REMOVED***`
***REMOVED***

export const frontendUrl = (): string => ***REMOVED***
  return `$***REMOVED***env('APP_DOMAIN')***REMOVED***$***REMOVED***env('APP_PATH')***REMOVED***`
***REMOVED***

export const LOCATION_HREF_KEY = `esa-originating-href`

export const windowLocation = ***REMOVED***
  remove: () => localStorage.removeItem(LOCATION_HREF_KEY),
  save: () => localStorage.setItem(LOCATION_HREF_KEY, window.location.href),
  get: () => localStorage.getItem(LOCATION_HREF_KEY),
***REMOVED***

export const keycloakCreationOptions = ***REMOVED***
  url: env('AUTH_URL'),
  realm: env('AUTH_REALM'),
  clientId: env('AUTH_CLIENT_ID'),
***REMOVED***

export const keycloakInitOptions: KeycloakInitOptions = ***REMOVED***
  pkceMethod: 'S256',
  onLoad: undefined,
***REMOVED***

export const keycloakLoginOptions = ***REMOVED***
  redirectUri: `$***REMOVED***env('AUTH_REDIRECT_URI')***REMOVED***$***REMOVED***encodeURIComponent(
    env('APP_DOMAIN')
  )***REMOVED***`,
  idpHint: 'idir',
  scope: env('AUTH_SCOPE'),
***REMOVED***
