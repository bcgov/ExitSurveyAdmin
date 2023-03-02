import React, ***REMOVED*** useEffect ***REMOVED*** from 'react'

import ***REMOVED*** windowLocation ***REMOVED*** from '../../helpers/envHelper'
import KeycloakService from './KeycloakService'
import LoginButton from './LoginButton'

const Unauthorized = (): JSX.Element => ***REMOVED***
  useEffect(() => ***REMOVED***
    windowLocation.save()
    KeycloakService.doLogin()
***REMOVED*** [])

  return (
    <div className="Centered row">
      <div className="col-6 offset-3">
        <h1 className="text-primary display-4 my-5">Exit Survey Admin</h1>
        <h1>You must log in to view this page.</h1>
        <p>You will be redirected shortly. If not, click the button below.</p>
        <LoginButton />
      </div>
    </div>
  )
***REMOVED***

export default Unauthorized
