import React, { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import userManager from '../../store/utils/userManager'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { deploymentUrl } from '../../helpers/envHelper'

interface IDispatchProps {
  dispatch: Dispatch<AnyAction>
}

interface IProps extends IDispatchProps, RouteComponentProps {}

class CallbackPage extends React.Component<IProps> {
  render(): JSX.Element {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={(user): void => {
          window.location.href = user.state.href
        }}
        errorCallback={(error: any): void => {
          console.log('Login error')
          console.error(error)
          window.location.href = deploymentUrl()
        }}
      >
        <div>
          <h1>Completing login&hellip;</h1>
          <p>If you are not redirected, there was an error (see the console)</p>
        </div>
      </CallbackComponent>
    )
  }
}

export default withRouter(connect()(CallbackPage))
