import React, { useEffect } from 'react'

import { windowLocation } from '../../helpers/envHelper'
import KeycloakService from './KeycloakService'
import LoginButton from './LoginButton'

const Unauthenticated = (): JSX.Element => {
  useEffect(() => {
    windowLocation.save()
    KeycloakService.doLogin()
  }, [])

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
}

export default Unauthenticated
