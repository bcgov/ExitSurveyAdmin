import * as React from 'react'

import AuthWrapper from './AuthWrapper'

interface AuthenticatedRouteProps {
  children: React.ReactNode
}

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps): JSX.Element => {
  // AuthWrapper handles authentication and authorization logic
  // If not authenticated/authorized, it renders Unauthenticated/Unauthorized
  // Otherwise, it renders children
  return <AuthWrapper>{children}</AuthWrapper>
}

export default AuthenticatedRoute
