import React from 'react'
import userManager from '../../store/utils/userManager'
import { getSigninRedirectOptions } from '../../helpers/envHelper'

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

class Unauthorized extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)

    this.loginClick = this.loginClick.bind(this)
  }

  loginClick(): void {
    console.log('Unauthorized: loginClick()')
    userManager.signinRedirect(getSigninRedirectOptions())
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>You must log in to view this page.</h1>
        <button
          className="btn btn-lg btn-outline-primary mt-3"
          onClick={this.loginClick}
        >
          Click here to log in &rarr;
        </button>
      </div>
    )
  }
}

export default Unauthorized
