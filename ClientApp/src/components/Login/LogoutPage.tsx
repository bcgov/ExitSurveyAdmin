import React, ***REMOVED*** useEffect, useState ***REMOVED*** from 'react'

import ***REMOVED*** windowLocation ***REMOVED*** from '../../helpers/envHelper'
import KeycloakService from './KeycloakService'
import LoginButton from './LoginButton'

const LogoutPage = () => ***REMOVED***
  const [loggedOut, setLoggedOut] = useState(!KeycloakService.isLoggedIn())

  useEffect(() => ***REMOVED***
    const logout = async () => ***REMOVED***
      if (KeycloakService.isLoggedIn()) ***REMOVED***
        await KeycloakService.doLogout()
        setLoggedOut(true)
    ***REMOVED***
  ***REMOVED***
    windowLocation.remove()
    logout()
***REMOVED*** [])

  return (
    <div className="Centered row">
      <div className="col-6 offset-3">
        <h1 className="text-primary display-4 my-5">
          ***REMOVED***loggedOut ? (
            <>Logged out</>
          ) : (
            <>
              <i className="fas fa-spinner fa-spin mr-4" />
              Logging out&hellip;
            </>
          )***REMOVED***
        </h1>
        ***REMOVED***loggedOut && (
          <>
            <p className="mb-4">You have successfully logged out.</p>
            <LoginButton />
          </>
        )***REMOVED***
      </div>
    </div>
  )
***REMOVED***

export default LogoutPage
