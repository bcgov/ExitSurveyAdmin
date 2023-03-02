import env from '@beam-australia/react-env'
import { KeycloakInitOptions } from 'keycloak-js'

export const routerBase = (): string => env('APP_PATH')

export const apiUrl = (): string => {
  return `${env('API_DOMAIN')}${env('APP_PATH')}`
}

export const frontendUrl = (): string => {
  return `${env('APP_DOMAIN')}${env('APP_PATH')}`
}

export const LOCATION_HREF_KEY = `esa-originating-href`

export const windowLocation = {
  remove: () => localStorage.removeItem(LOCATION_HREF_KEY),
  save: () => localStorage.setItem(LOCATION_HREF_KEY, window.location.href),
  get: () => localStorage.getItem(LOCATION_HREF_KEY),
}

export const keycloakCreationOptions = {
  url: env('AUTH_URL'),
  realm: env('AUTH_REALM'),
  clientId: env('AUTH_CLIENT_ID'),
}

export const keycloakInitOptions: KeycloakInitOptions = {
  pkceMethod: 'S256',
  onLoad: undefined,
}

export const keycloakLoginOptions = {
  redirectUri: env('APP_DOMAIN'),
  idpHint: 'idir',
  scope: env('AUTH_SCOPE'),
}
