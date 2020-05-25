/* eslint-disable @typescript-eslint/camelcase */

import { createUserManager } from 'redux-oidc'
import { WebStorageStateStore } from 'oidc-client'

const userManagerConfig = {
  client_id: 'ExitSurveyAdmin',
  redirect_uri: process.env.REACT_APP_CALLBACK_LOCATION,
  response_type: 'code',
  scope: 'openid profile resourceApi',
  authority: 'https://sso-dev.pathfinder.gov.bc.ca/auth/realms/ytaqhqia',
  silent_redirect_uri: `${window.location.protocol}//${
    window.location.hostname
  }${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage })
}

const userManager = createUserManager(userManagerConfig)

export default userManager
