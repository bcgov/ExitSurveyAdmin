import React, { useEffect, useState } from 'react'

import { windowLocation } from '../../helpers/envHelper'
import KeycloakService from './KeycloakService'
import LoginButton from './LoginButton'

const LogoutPage = () => {
  const [loggedOut, setLoggedOut] = useState(!KeycloakService.isLoggedIn())

  useEffect(() => {
    const logout = async () => {
      if (KeycloakService.isLoggedIn()) {
        await KeycloakService.doLogout()
        setLoggedOut(true)
      }
    }
    windowLocation.remove()
    logout()
  }, [])

  return (
    <div className="Centered row">
      <div className="col-6 offset-3">
        <h1 className="text-primary display-4 my-5">
          {loggedOut ? (
            <>Logged out</>
          ) : (
            <>
              <i className="fas fa-spinner fa-spin mr-4" />
              Logging out&hellip;
            </>
          )}
        </h1>
        {loggedOut && (
          <>
            <p className="mb-4">You have successfully logged out.</p>
            <LoginButton />
          </>
        )}
      </div>
    </div>
  )
}

export default LogoutPage
