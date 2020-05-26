/* eslint-disable @typescript-eslint/camelcase */

import { createUserManager } from 'redux-oidc'
import { WebStorageStateStore } from 'oidc-client'
import env from '@beam-australia/react-env'

const userManagerConfig = {
  client_id: env('AUTH_CLIENT_ID'),
  redirect_uri: env('AUTH_CALLBACK_LOCATION'),
  response_type: env('AUTH_RESPONSE_TYPE'),
  scope: env('AUTH_SCOPE'),
  authority: env('AUTH_URL'),
  silent_redirect_uri: env('AUTH_SILENT_REDIRECT_URL'),
  automaticSilentRenew: env('AUTH_AUTO_SILENT_RENEW'),
  filterProtocolClaims: env('AUTH_FILTER_PROTOCOL_CLAIMS'),
  loadUserInfo: env('AUTH_LOAD_USER_INFO'),
  userStore: new WebStorageStateStore({ store: window.localStorage })
}

const userManager = createUserManager(userManagerConfig)

export default userManager
