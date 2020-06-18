/* eslint-disable @typescript-eslint/camelcase */

import env from '@beam-australia/react-env'
import { WebStorageStateStore } from 'oidc-client'

export const routerBase = (): string => env('APP_PATH')

export const deploymentUrl = (): string => {
  return `${env('APP_DOMAIN')}${env('APP_PATH')}`
}

export const signinRedirectOptions = {
  data: {
    href: window.location.href
  }
  // extraQueryParams: {
  //   kc_idp_hint: 'idir'
  // }
}

export const userManagerConfig = {
  client_id: env('AUTH_CLIENT_ID'),
  redirect_uri: `${deploymentUrl()}callback`,
  response_type: env('AUTH_RESPONSE_TYPE'),
  scope: env('AUTH_SCOPE'),
  authority: env('AUTH_URL'),
  // silent_redirect_uri: `${deploymentUrl()}silent_renew.html`,
  automaticSilentRenew: env('AUTH_AUTO_SILENT_RENEW'),
  filterProtocolClaims: env('AUTH_FILTER_PROTOCOL_CLAIMS'),
  loadUserInfo: env('AUTH_LOAD_USER_INFO'),
  userStore: new WebStorageStateStore({ store: window.localStorage })
}
