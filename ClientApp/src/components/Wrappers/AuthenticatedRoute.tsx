import React from 'react'
import { Route } from 'react-router-dom'
import AuthWrapper from './AuthWrapper'
import { FixTypeLater } from '../../types/FixTypeLater'

const AuthenticatedRoute = ({
  component: Component,
  ...rest
}: FixTypeLater): JSX.Element => (
  <Route
    {...rest}
    render={(props): JSX.Element => (
      <AuthWrapper>
        <Component {...props} />
      </AuthWrapper>
    )}
  />
)

export default AuthenticatedRoute
