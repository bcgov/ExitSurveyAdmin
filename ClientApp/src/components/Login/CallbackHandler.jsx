import React from 'react'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'connected-react-router'
import userManager from '../../utils/userManager'

class CallbackPage extends React.Component {
  async componentDidMount() {
    const user = await userManager.getUser()

    console.log(user)
  }

  render() {
    // just redirect to '/' in both cases

    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={() => this.props.dispatch(push('/'))}
        errorCallback={error => {
          this.props.dispatch(push('/'))
          console.error(error)
        }}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    )
  }
}

export default connect()(CallbackPage)
