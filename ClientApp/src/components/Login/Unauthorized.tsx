import React, { useEffect } from 'react'
import userManager from '../../store/utils/userManager'
import { getSigninRedirectOptions } from '../../helpers/envHelper'

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

const Unauthorized = (): JSX.Element => {
  useEffect(() => {
    const timer = setTimeout(() => {
      userManager.signinRedirect(getSigninRedirectOptions())
    }, 100)
    return (): void => clearTimeout(timer)
  }, [])

  return (
    <div className="Unauthorized row align-items-center">
      <div className="col-6 offset-3">
        <h1 className="text-primary display-3 mb-5">Exit Survey Admin</h1>
        <h1>You must log in to view this page.</h1>
        <p>If you are not redirected, click the button below.</p>
        <button
          className="btn btn-lg btn-outline-primary mt-3"
          onClick={(): Promise<void> =>
            userManager.signinRedirect(getSigninRedirectOptions())
          }
        >
          Click here to log in &rarr;
        </button>
      </div>
    </div>
  )
}

export default Unauthorized
