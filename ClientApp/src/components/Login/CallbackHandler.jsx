import React from 'react'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import ***REMOVED*** CallbackComponent ***REMOVED*** from 'redux-oidc'
import ***REMOVED*** push ***REMOVED*** from 'connected-react-router'
import userManager from '../../utils/userManager'

class CallbackPage extends React.Component ***REMOVED***
  render() ***REMOVED***
    // just redirect to '/' in both cases
    return (
      <CallbackComponent
        userManager=***REMOVED***userManager***REMOVED***
        successCallback=***REMOVED***() => this.props.dispatch(push('/'))***REMOVED***
        errorCallback=***REMOVED***error => ***REMOVED***
          this.props.dispatch(push('/'))
          console.error(error)
      ***REMOVED******REMOVED***
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    )
***REMOVED***
***REMOVED***

export default connect()(CallbackPage)
