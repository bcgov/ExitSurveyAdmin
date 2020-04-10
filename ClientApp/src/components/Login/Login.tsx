import React from 'react'

import { connect } from 'react-redux'

interface IStateProps {
  token: string
}

interface IProps extends IStateProps {}

interface IState {
  username?: string
  password?: string
  authorized: boolean
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }

  attemptLogin(): void {
    // console.log(this.state.username, this.state.password)
    if (!this.state.authorized) {
      window.location.href = `https://sso-dev.pathfinder.gov.bc.ca/auth/realms/ytaqhqia`
    }
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
