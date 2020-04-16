import React from 'react'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import ***REMOVED*** CallbackComponent ***REMOVED*** from 'redux-oidc'
import ***REMOVED*** push ***REMOVED*** from 'connected-react-router'
import userManager from '../../store/utils/userManager'

class CallbackPage extends React.Component ***REMOVED***
  async componentDidMount() ***REMOVED***
    const user = await userManager.getUser()

    console.log(user)
***REMOVED***

  render() ***REMOVED***
    // just redirect to '/' in both cases

    return (
      <CallbackComponent
        userManager=***REMOVED***userManager***REMOVED***
        successCallback=***REMOVED***() => ***REMOVED***
          console.log('There was a login success')
          this.props.dispatch(push('/'))
      ***REMOVED******REMOVED***
        errorCallback=***REMOVED***error => ***REMOVED***
          console.log('There was an error')
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
