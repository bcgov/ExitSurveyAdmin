import React from 'react'
import userManager from '../../store/utils/userManager'

import { connect } from 'react-redux'

interface IProps {}

interface IState {}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.loginClick = this.loginClick.bind(this)
  }

  loginClick(): void {
    userManager.signinRedirect()
  }

  public render(): JSX.Element {
    return (
      <div className="Login">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.loginClick}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default connect()(Login)
