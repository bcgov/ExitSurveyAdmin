/* eslint-disable no-console */
import React, ***REMOVED*** Dispatch ***REMOVED*** from 'react'
import ***REMOVED*** AnyAction ***REMOVED*** from 'redux'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import ***REMOVED*** CallbackComponent ***REMOVED*** from 'redux-oidc'
import userManager from '../../store/utils/userManager'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router-dom'
import ***REMOVED*** deploymentUrl ***REMOVED*** from '../../helpers/envHelper'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'

interface IDispatchProps ***REMOVED***
  dispatch: Dispatch<AnyAction>
***REMOVED***

interface IProps extends IDispatchProps, RouteComponentProps ***REMOVED******REMOVED***

class CallbackPage extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <CallbackComponent
        userManager=***REMOVED***userManager***REMOVED***
        successCallback=***REMOVED***(user): void => ***REMOVED***
          window.location.href = user.state.href
      ***REMOVED******REMOVED***
        errorCallback=***REMOVED***(error: FixTypeLater): void => ***REMOVED***
          console.log('Login error')
          console.error(error)
          window.location.href = deploymentUrl()
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
    )
***REMOVED***
***REMOVED***

export default withRouter(connect()(CallbackPage))
