import Keycloak from 'keycloak-js'
import ***REMOVED***
  keycloakCreationOptions,
  keycloakInitOptions,
  keycloakLoginOptions,
***REMOVED*** from '../../helpers/envHelper'

// Implementation adapted from https://github.com/dasniko/keycloak-reactjs-demo

const MIN_TOKEN_VALIDITY_IN_SECONDS = 600

const _kc = new Keycloak(keycloakCreationOptions)

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 */
const initKeycloak = (onAuthenticatedCallback: Function) => ***REMOVED***
  _kc
    .init(keycloakInitOptions)
    .then((authenticated) => ***REMOVED***
      console.log(`User is authenticated: $***REMOVED***authenticated***REMOVED***`)
      onAuthenticatedCallback()
  ***REMOVED***)
    .catch(console.error)

  _kc.onTokenExpired = () => ***REMOVED***
    _kc.updateToken(MIN_TOKEN_VALIDITY_IN_SECONDS)
***REMOVED***
***REMOVED***

const doLogin = () => ***REMOVED***
  _kc.login(keycloakLoginOptions)
***REMOVED***

const doLogout = _kc.logout

const getToken = () => _kc.token

const isLoggedIn = () => !!_kc.token

const updateToken = () => _kc.updateToken(MIN_TOKEN_VALIDITY_IN_SECONDS)

const getUsername = () => ***REMOVED***
  if (_kc.tokenParsed) ***REMOVED***
    const ***REMOVED*** given_name: givenName, family_name: familyName ***REMOVED*** = _kc.tokenParsed
    return `$***REMOVED***givenName***REMOVED*** $***REMOVED***familyName***REMOVED***`
***REMOVED***
  return `Name unavailable`
***REMOVED***

const hasRole = (roles: string[]) =>
  roles.some((role) => _kc.hasRealmRole(role))

const KeycloakService = ***REMOVED***
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
***REMOVED***

export default KeycloakService
