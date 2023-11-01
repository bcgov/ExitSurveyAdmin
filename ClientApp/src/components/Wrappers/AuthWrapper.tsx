import React from 'react'
import ***REMOVED*** authRole ***REMOVED*** from '../../helpers/envHelper'

import KeycloakService from '../Login/KeycloakService'
import Unauthorized from '../Login/Unauthorized'
import Unauthenticated from '../Login/Unauthenticated'

interface AuthWrapperProps ***REMOVED***
  children: React.ReactNode
***REMOVED***

const AuthWrapper = (props: AuthWrapperProps): JSX.Element => ***REMOVED***
  const isLoggedIn = KeycloakService.isLoggedIn()
  const hasCorrectRole = KeycloakService.hasRole([authRole()])

  if (!isLoggedIn) return <Unauthenticated />
  if (!hasCorrectRole) return <Unauthorized />

  return <>***REMOVED***props.children***REMOVED***</>
***REMOVED***

export default AuthWrapper
