import React from 'react'
import ***REMOVED*** Route ***REMOVED*** from 'react-router-dom'
import AuthWrapper from './AuthWrapper'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'

const AuthenticatedRoute = (***REMOVED***
  component: Component,
  ...rest
***REMOVED***: FixTypeLater): JSX.Element => (
  <Route
    ***REMOVED***...rest***REMOVED***
    render=***REMOVED***(props): JSX.Element => (
      <AuthWrapper>
        <Component ***REMOVED***...props***REMOVED*** />
      </AuthWrapper>
    )***REMOVED***
  />
)

export default AuthenticatedRoute
