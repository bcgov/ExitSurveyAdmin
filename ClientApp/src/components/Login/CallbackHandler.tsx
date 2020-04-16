import React, ***REMOVED*** Dispatch ***REMOVED*** from 'react'
import ***REMOVED*** AnyAction ***REMOVED*** from 'redux'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import ***REMOVED*** CallbackComponent ***REMOVED*** from 'redux-oidc'
import ***REMOVED*** push ***REMOVED*** from 'connected-react-router'
import userManager from '../../store/utils/userManager'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router-dom'

interface IDispatchProps ***REMOVED***
  dispatch: Dispatch<AnyAction>
***REMOVED***

interface IProps extends IDispatchProps, RouteComponentProps ***REMOVED******REMOVED***

class CallbackPage extends React.Component<IProps> ***REMOVED***
  async componentDidMount(): Promise<void> ***REMOVED***
    const user = await userManager.getUser()
    console.log(user)
***REMOVED***

  render(): JSX.Element ***REMOVED***
    // just redirect to '/' in both cases

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
        <div>Redirecting... if not, there was an error (see console)</div>
      </CallbackComponent>
    )
***REMOVED***
***REMOVED***

export default withRouter(connect()(CallbackPage))
