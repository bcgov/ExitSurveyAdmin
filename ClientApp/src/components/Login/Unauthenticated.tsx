import React, ***REMOVED*** useEffect ***REMOVED*** from 'react'

import ***REMOVED*** windowLocation ***REMOVED*** from '../../helpers/envHelper'
import KeycloakService from './KeycloakService'
import LoginButton from './LoginButton'

const Unauthenticated = (): JSX.Element => ***REMOVED***
  useEffect(() => ***REMOVED***
    windowLocation.save()
    KeycloakService.doLogin()
***REMOVED*** [])

  return (
    <div className="Centered row">
      <div className="col-6 offset-3">
        <h1 className="text-primary display-4 my-5">New Job Survey Admin</h1>
        <p className="lead">You must log in to view this page.</p>
        <p>You will be redirected shortly. If not, click the button below.</p>
        <LoginButton />
      </div>
    </div>
  )
***REMOVED***

export default Unauthenticated
