import Keycloak from 'keycloak-js'
import {
  keycloakCreationOptions,
  keycloakInitOptions,
  keycloakLoginOptions,
} from '../../helpers/envHelper'

// Implementation adapted from https://github.com/dasniko/keycloak-reactjs-demo

const MIN_TOKEN_VALIDITY_IN_SECONDS = 600

const _kc = new Keycloak(keycloakCreationOptions)

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 */
const initKeycloak = (onAuthenticatedCallback: Function) => {
  _kc
    .init(keycloakInitOptions)
    .then((authenticated) => {
      console.log(`User is authenticated: ${authenticated}`)
      onAuthenticatedCallback()
    })
    .catch(console.error)

  _kc.onTokenExpired = () => {
    _kc.updateToken(MIN_TOKEN_VALIDITY_IN_SECONDS)
  }
}

const doLogin = () => {
  _kc.login(keycloakLoginOptions)
}

const doLogout = _kc.logout

const getToken = () => _kc.token

const isLoggedIn = () => !!_kc.token

const updateToken = () => _kc.updateToken(MIN_TOKEN_VALIDITY_IN_SECONDS)

const getUsername = () => {
  if (_kc.tokenParsed) {
    const { given_name: givenName, family_name: familyName } = _kc.tokenParsed
    return `${givenName} ${familyName}`
  }
  return `Name unavailable`
}

const hasRole = (roles: string[]) =>
  roles.some((role) => _kc.hasRealmRole(role))

const KeycloakService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
}

export default KeycloakService
