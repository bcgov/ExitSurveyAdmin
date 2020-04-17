import React, ***REMOVED*** Dispatch ***REMOVED*** from 'react'
import ***REMOVED*** AnyAction ***REMOVED*** from 'redux'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import ***REMOVED*** CallbackComponent ***REMOVED*** from 'redux-oidc'
import userManager from '../../store/utils/userManager'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router-dom'

interface IDispatchProps ***REMOVED***
  dispatch: Dispatch<AnyAction>
***REMOVED***

interface IProps extends IDispatchProps, RouteComponentProps ***REMOVED******REMOVED***

class CallbackPage extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <CallbackComponent
        userManager=***REMOVED***userManager***REMOVED***
        successCallback=***REMOVED***(): void => ***REMOVED***
          console.log('There was a login success')
          this.props.history.push('/')
      ***REMOVED******REMOVED***
        errorCallback=***REMOVED***(error: any): void => ***REMOVED***
          console.log('There was an error')
          console.error(error)
      ***REMOVED******REMOVED***
      >
        <div>
          <h1>Completing login&hellip;</h1>
          <p>If you are not redirected, there was an error (see the console)</p>
        </div>
      </CallbackComponent>
    )
***REMOVED***
***REMOVED***

export default withRouter(connect()(CallbackPage))
