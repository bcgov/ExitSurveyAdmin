import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'

import AuthWrapper from './AuthWrapper'

interface AuthenticatedRouteProps ***REMOVED***
  children: React.ReactNode
***REMOVED***

const AuthenticatedRoute = (***REMOVED*** children ***REMOVED***: AuthenticatedRouteProps): JSX.Element => ***REMOVED***
  // AuthWrapper handles authentication and authorization logic
  // If not authenticated/authorized, it renders Unauthenticated/Unauthorized
  // Otherwise, it renders children
  return <AuthWrapper>***REMOVED***children***REMOVED***</AuthWrapper>
***REMOVED***

export default AuthenticatedRoute
