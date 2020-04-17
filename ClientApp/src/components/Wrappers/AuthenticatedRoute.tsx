import React from 'react'
import { Route } from 'react-router-dom'
import AuthWrapper from './AuthWrapper'

const AuthenticatedRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props => (
      <AuthWrapper>
        <Component {...props} />
      </AuthWrapper>
    )}
  />
)

export default AuthenticatedRoute
