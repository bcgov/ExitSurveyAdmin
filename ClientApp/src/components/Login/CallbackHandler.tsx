/* eslint-disable no-console */
import React, { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { CallbackComponent } from 'redux-oidc'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { deploymentUrl } from '../../helpers/envHelper'
import { FixTypeLater } from '../../types/FixTypeLater'
import userManager from '../../store/utils/userManager'

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
        errorCallback={(error: FixTypeLater): void => {
          console.log('Login error')
          console.error(error)
          window.location.href = deploymentUrl()
        }}
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
  }
}

export default withRouter(connect()(CallbackPage))
