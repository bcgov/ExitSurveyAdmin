import { KeycloakInitOptions } from 'keycloak-js'

interface AppConfig {
  VITE_APP_PATH?: string;
  VITE_API_DOMAIN?: string;
  VITE_APP_DOMAIN?: string;
  VITE_AUTH_ROLE?: string;
  VITE_AUTH_URL?: string;
  VITE_AUTH_REALM?: string;
  VITE_AUTH_CLIENT_ID?: string;
  VITE_AUTH_SCOPE?: string;
}

const config: AppConfig = (window as { APP_CONFIG?: AppConfig }).APP_CONFIG ?? {};

export const routerBase = (): string => config.VITE_APP_PATH ?? ''

export const apiUrl = (): string => {
  return `${config.VITE_API_DOMAIN ?? ''}${config.VITE_APP_PATH ?? ''}`
}

export const frontendUrl = (): string => {
  return `${config.VITE_APP_DOMAIN ?? ''}${config.VITE_APP_PATH ?? ''}`
}

export const authRole = (): string => {
  return config.VITE_AUTH_ROLE ?? ''
}

export const LOCATION_HREF_KEY = `esa-originating-href`

export const windowLocation = {
  remove: () => localStorage.removeItem(LOCATION_HREF_KEY),
  save: () => localStorage.setItem(LOCATION_HREF_KEY, window.location.href),
  get: () => localStorage.getItem(LOCATION_HREF_KEY),
}

export const keycloakCreationOptions = {
  url: config.VITE_AUTH_URL ?? '',
  realm: config.VITE_AUTH_REALM ?? '',
  clientId: config.VITE_AUTH_CLIENT_ID ?? '',
}

export const keycloakInitOptions: KeycloakInitOptions = {
  pkceMethod: 'S256',
  onLoad: undefined,
}

export const keycloakLoginOptions = {
  redirectUri: config.VITE_APP_DOMAIN ?? '',
  idpHint: 'idir',
  scope: config.VITE_AUTH_SCOPE ?? '',
}
