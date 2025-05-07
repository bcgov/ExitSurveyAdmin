import { KeycloakInitOptions } from 'keycloak-js'

export const routerBase = (): string => import.meta.env.VITE_APP_PATH ?? ''

export const apiUrl = (): string => {
  return `${import.meta.env.VITE_API_DOMAIN ?? ''}${import.meta.env.VITE_APP_PATH ?? ''}`
}

export const frontendUrl = (): string => {
  return `${import.meta.env.VITE_APP_DOMAIN ?? ''}${import.meta.env.VITE_APP_PATH ?? ''}`
}

export const authRole = (): string => {
  return import.meta.env.VITE_AUTH_ROLE ?? ''
}

export const LOCATION_HREF_KEY = `esa-originating-href`

export const windowLocation = {
  remove: () => localStorage.removeItem(LOCATION_HREF_KEY),
  save: () => localStorage.setItem(LOCATION_HREF_KEY, window.location.href),
  get: () => localStorage.getItem(LOCATION_HREF_KEY),
}

export const keycloakCreationOptions = {
  url: import.meta.env.VITE_AUTH_URL ?? '',
  realm: import.meta.env.VITE_AUTH_REALM ?? '',
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID ?? '',
}

export const keycloakInitOptions: KeycloakInitOptions = {
  pkceMethod: 'S256',
  onLoad: undefined,
}

export const keycloakLoginOptions = {
  redirectUri: import.meta.env.VITE_APP_DOMAIN ?? '',
  idpHint: 'idir',
  scope: import.meta.env.VITE_AUTH_SCOPE ?? '',
}
