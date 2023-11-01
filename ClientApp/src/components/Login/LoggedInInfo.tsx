import { Link } from 'react-router-dom'
import React from 'react'

import FAIcon from '../DisplayHelpers/Interface/Icons/FAIcon'
import KeycloakService from './KeycloakService'

const LoggedInInfo = (): JSX.Element => {
  return (
    <>
      {KeycloakService.isLoggedIn() && (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item d-flex align-items-center">
            <div style={{ lineHeight: '100%' }}>
              Logged in: <strong>{KeycloakService.getUsername()}</strong>
            </div>
            <Link
              to="/logout"
              className="btn btn-outline-secondary btn-sm ml-2"
            >
              Log out <FAIcon name="sign-out-alt" marginClasses="ml-1" />
            </Link>
          </li>
        </ul>
      )}
    </>
  )
}

export default LoggedInInfo
