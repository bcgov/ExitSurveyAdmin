import * as React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'
import KeycloakService from '../Login/KeycloakService'
import { FixTypeLater } from '../../types/FixTypeLater'
import AuthWrapper from './AuthWrapper'

// interface PrivateRouteParams extends RouteProps {
//   component:
//     | React.ComponentType<RouteComponentProps<any>>
//     | React.ComponentType<any>
// }

// const AuthenticatedRoute = ({
//   component: Component,
//   ...rest
// }: PrivateRouteParams) => {
// const isAuthenticated = KeycloakService.isLoggedIn()

// New and Good and Working
// return (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />
// )
// }

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
