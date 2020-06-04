import React, ***REMOVED*** useEffect ***REMOVED*** from 'react'
import userManager from '../../store/utils/userManager'
import ***REMOVED*** getSigninRedirectOptions ***REMOVED*** from '../../helpers/envHelper'

interface IOwnProps ***REMOVED******REMOVED***

interface IStateProps ***REMOVED******REMOVED***

interface IDispatchProps ***REMOVED******REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

const Unauthorized = (): JSX.Element => ***REMOVED***
  useEffect(() => ***REMOVED***
    const timer = setTimeout(() => ***REMOVED***
      userManager.signinRedirect(getSigninRedirectOptions())
  ***REMOVED*** 100)
    return (): void => clearTimeout(timer)
***REMOVED*** [])

  return (
    <div className="Centered row">
      <div className="col-6 offset-3">
        <h1 className="text-primary display-4 my-5">Exit Survey Admin</h1>
        <h1>You must log in to view this page.</h1>
        <p>If you are not redirected, click the button below.</p>
        <button
          className="btn btn-lg btn-outline-primary mt-3"
          onClick=***REMOVED***(): Promise<void> =>
            userManager.signinRedirect(getSigninRedirectOptions())
        ***REMOVED***
        >
          Click here to log in &rarr;
        </button>
      </div>
    </div>
  )
***REMOVED***

export default Unauthorized
