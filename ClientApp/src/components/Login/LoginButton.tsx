import React from 'react'

import Button from '../DisplayHelpers/Interface/Buttons/Button'
import KeycloakService from './KeycloakService'

const LoginButton = () => {
  return (
    <Button onClick={() => KeycloakService.doLogin()}>
      Click here to log in &rarr;
    </Button>
  )
}

export default LoginButton
