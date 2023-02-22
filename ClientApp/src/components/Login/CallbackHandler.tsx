/* eslint-disable no-console */
import React, ***REMOVED*** Dispatch ***REMOVED*** from 'react'
import ***REMOVED*** AnyAction ***REMOVED*** from 'redux'
import ***REMOVED*** CallbackComponent ***REMOVED*** from 'redux-oidc'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router-dom'

import ***REMOVED*** frontendUrl ***REMOVED*** from '../../helpers/envHelper'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import userManager from '../../store/utils/userManager'

interface DispatchProps ***REMOVED***
  dispatch: Dispatch<AnyAction>
***REMOVED***

interface Props extends DispatchProps, RouteComponentProps ***REMOVED******REMOVED***

class CallbackPage extends React.Component<Props> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <>
        <CallbackComponent
          userManager=***REMOVED***userManager***REMOVED***
          successCallback=***REMOVED***(user: FixTypeLater): void => ***REMOVED***
            window.location.href = user.state.href
        ***REMOVED******REMOVED***
          errorCallback=***REMOVED***(error: FixTypeLater): void => ***REMOVED***
            console.log('Login error')
            console.error(error)
            window.location.href = frontendUrl()
        ***REMOVED******REMOVED***
        >
          <div className="Centered row">
            <div className="col-6 offset-3">
              <h1 className="text-primary display-4 my-5">
                <i className="fas fa-spinner fa-spin mr-4"></i>Completing
                login&hellip;
              </h1>
              <p>
                If you are not redirected, there was an error (see the console)
              </p>
            </div>
          </div>
        </CallbackComponent>
      </>
    )
***REMOVED***
***REMOVED***

export default withRouter(connect()(CallbackPage))
