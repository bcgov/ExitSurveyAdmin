import React from 'react'
import userManager from '../../utils/userManager'

import ***REMOVED*** connect ***REMOVED*** from 'react-redux'

interface IStateProps ***REMOVED***
  token: string
***REMOVED***

interface IProps extends IStateProps ***REMOVED******REMOVED***

interface IState ***REMOVED******REMOVED***

class Login extends React.Component<IProps, IState> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)

    this.attemptLogin = this.attemptLogin.bind(this)
***REMOVED***

  attemptLogin(): void ***REMOVED***
    // console.log(this.state.username, this.state.password)
    // window.location.href = `https://sso-dev.pathfinder.gov.bc.ca/auth/realms/ytaqhqia`
    // event.preventDefault()
    userManager.signinRedirect()
***REMOVED***

  public render(): JSX.Element ***REMOVED***
    return (
      <div className="Login">
        <p>Your token: ***REMOVED***this.props.token***REMOVED***</p>
        <button
          type="submit"
          className="btn btn-primary"
          onClick=***REMOVED***this.attemptLogin***REMOVED***
        >
          Submit
        </button>
      </div>
    )
***REMOVED***
***REMOVED***

const mapStateToProps = (state: any): IStateProps => ***REMOVED***
  return ***REMOVED***
    token: state.token
***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(Login)
