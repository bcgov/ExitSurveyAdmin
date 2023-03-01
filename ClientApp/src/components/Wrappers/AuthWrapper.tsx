import React from 'react'

import KeycloakService from '../Login/KeycloakService'
import Unauthorized from '../Login/Unauthorized'

interface AuthWrapperProps ***REMOVED***
  children: React.ReactNode
***REMOVED***

const AuthWrapper = (props: AuthWrapperProps): JSX.Element => ***REMOVED***
  const isLoggedIn = KeycloakService.isLoggedIn()

  return !isLoggedIn ? <Unauthorized /> : <>***REMOVED***props.children***REMOVED***</>
***REMOVED***

export default AuthWrapper
