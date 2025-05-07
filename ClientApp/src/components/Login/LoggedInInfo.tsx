import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'
import React from 'react'

import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'
import KeycloakService from './KeycloakService'

const LoggedInInfo = (): JSX.Element => ***REMOVED***
  return (
    <>
      ***REMOVED***KeycloakService.isLoggedIn() && (
        <ul className="navbar-nav me-auto">
          <li className="nav-item d-flex align-items-center">
            <div style=***REMOVED******REMOVED*** lineHeight: '100%' ***REMOVED******REMOVED***>
              Logged in: <strong>***REMOVED***KeycloakService.getUsername()***REMOVED***</strong>
            </div>
            <Link
              to="/logout"
              className="btn btn-outline-secondary btn-sm ms-2"
            >
              Log out <FAIcon name="sign-out-alt" marginClasses="ms-1" />
            </Link>
          </li>
        </ul>
      )***REMOVED***
    </>
  )
***REMOVED***

export default LoggedInInfo
