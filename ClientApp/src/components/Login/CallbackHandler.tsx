import React, { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'connected-react-router'
import userManager from '../../store/utils/userManager'

interface IDispatchProps {
  dispatch: Dispatch<AnyAction>
}

interface IProps extends IDispatchProps {}

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
          this.props.dispatch(push('/'))
        }}
        errorCallback={(error: any): void => {
          console.log('There was an error')
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
