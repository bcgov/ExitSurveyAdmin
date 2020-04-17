import React, { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import userManager from '../../store/utils/userManager'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface IDispatchProps {
  dispatch: Dispatch<AnyAction>
}

interface IProps extends IDispatchProps, RouteComponentProps {}

class CallbackPage extends React.Component<IProps> {
  async componentDidMount(): Promise<void> {
    const user = await userManager.getUser()
    console.log(user)
  }

  render(): JSX.Element {
    // just redirect to '/' in both cases

    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={(): void => {
          console.log('There was a login success')
          this.props.history.push('/')
        }}
        errorCallback={(error: any): void => {
          console.log('There was an error')
          console.error(error)
          this.props.history.push('/')
        }}
      >
        <div>Redirecting... if not, there was an error (see console)</div>
      </CallbackComponent>
    )
  }
}

export default withRouter(connect()(CallbackPage))
