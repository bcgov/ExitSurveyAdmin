import React from 'react'
import ***REMOVED*** Route ***REMOVED*** from 'react-router-dom'
import AuthWrapper from './AuthWrapper'

const AuthenticatedRoute = (***REMOVED*** component: Component, ...rest ***REMOVED***: any) => (
  <Route
    ***REMOVED***...rest***REMOVED***
    render=***REMOVED***props => (
      <AuthWrapper>
        <Component ***REMOVED***...props***REMOVED*** />
      </AuthWrapper>
    )***REMOVED***
  />
)

export default AuthenticatedRoute
