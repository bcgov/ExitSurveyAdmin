import * as React from 'react'
import ***REMOVED*** Route, Redirect, RouteComponentProps ***REMOVED*** from 'react-router-dom'
import type ***REMOVED*** RouteProps ***REMOVED*** from 'react-router-dom'
import KeycloakService from '../Login/KeycloakService'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import AuthWrapper from './AuthWrapper'

// interface PrivateRouteParams extends RouteProps ***REMOVED***
//   component:
//     | React.ComponentType<RouteComponentProps<any>>
//     | React.ComponentType<any>
// ***REMOVED***

// const AuthenticatedRoute = (***REMOVED***
//   component: Component,
//   ...rest
// ***REMOVED***: PrivateRouteParams) => ***REMOVED***
// const isAuthenticated = KeycloakService.isLoggedIn()

// New and Good and Working
// return (
//   <Route
//     ***REMOVED***...rest***REMOVED***
//     render=***REMOVED***(props) =>
//       isAuthenticated ? (
//         <Component ***REMOVED***...props***REMOVED*** />
//       ) : (
//         <Redirect
//           to=***REMOVED******REMOVED***
//             pathname: '/login',
//             state: ***REMOVED*** from: props.location ***REMOVED***,
//         ***REMOVED******REMOVED***
//         />
//       )
//   ***REMOVED***
//   />
// )
// ***REMOVED***

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
