import React from 'react'
import userManager from '../../utils/userManager'

import { connect } from 'react-redux'

interface IStateProps {
  token: string
}

interface IProps extends IStateProps {}

interface IState {}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.attemptLogin = this.attemptLogin.bind(this)
  }

  attemptLogin(): void {
    // console.log(this.state.username, this.state.password)
    // window.location.href = `https://sso-dev.pathfinder.gov.bc.ca/auth/realms/ytaqhqia`
    // event.preventDefault()
    userManager.signinRedirect()
  }

  public render(): JSX.Element {
    return (
      <div className="Login">
        <p>Your token: {this.props.token}</p>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.attemptLogin}
        >
          Submit
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state: any): IStateProps => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(Login)
