import ***REMOVED*** KeycloakInitOptions ***REMOVED*** from 'keycloak-js'

export const routerBase = (): string => import.meta.env.VITE_APP_PATH ?? ''

export const apiUrl = (): string => ***REMOVED***
  return `$***REMOVED***import.meta.env.VITE_API_DOMAIN ?? ''***REMOVED***$***REMOVED***import.meta.env.VITE_APP_PATH ?? ''***REMOVED***`
***REMOVED***

export const frontendUrl = (): string => ***REMOVED***
  return `$***REMOVED***import.meta.env.VITE_APP_DOMAIN ?? ''***REMOVED***$***REMOVED***import.meta.env.VITE_APP_PATH ?? ''***REMOVED***`
***REMOVED***

export const authRole = (): string => ***REMOVED***
  return import.meta.env.VITE_AUTH_ROLE ?? ''
***REMOVED***

export const LOCATION_HREF_KEY = `esa-originating-href`

export const windowLocation = ***REMOVED***
  remove: () => localStorage.removeItem(LOCATION_HREF_KEY),
  save: () => localStorage.setItem(LOCATION_HREF_KEY, window.location.href),
  get: () => localStorage.getItem(LOCATION_HREF_KEY),
***REMOVED***

export const keycloakCreationOptions = ***REMOVED***
  url: import.meta.env.VITE_AUTH_URL ?? '',
  realm: import.meta.env.VITE_AUTH_REALM ?? '',
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID ?? '',
***REMOVED***

export const keycloakInitOptions: KeycloakInitOptions = ***REMOVED***
  pkceMethod: 'S256',
  onLoad: undefined,
***REMOVED***

export const keycloakLoginOptions = ***REMOVED***
  redirectUri: import.meta.env.VITE_APP_DOMAIN ?? '',
  idpHint: 'idir',
  scope: import.meta.env.VITE_AUTH_SCOPE ?? '',
***REMOVED***
