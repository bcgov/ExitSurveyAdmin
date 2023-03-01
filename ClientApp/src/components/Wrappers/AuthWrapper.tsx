import React from 'react'

import KeycloakService from '../Login/KeycloakService'
import Unauthorized from '../Login/Unauthorized'

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper = (props: AuthWrapperProps): JSX.Element => {
  const isLoggedIn = KeycloakService.isLoggedIn()

  return !isLoggedIn ? <Unauthorized /> : <>{props.children}</>
}

export default AuthWrapper
