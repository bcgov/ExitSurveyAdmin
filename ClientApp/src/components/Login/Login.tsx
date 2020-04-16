import React from 'react'
import userManager from '../../store/utils/userManager'

import ***REMOVED*** connect ***REMOVED*** from 'react-redux'

interface IProps ***REMOVED******REMOVED***

interface IState ***REMOVED******REMOVED***

class Login extends React.Component<IProps, IState> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)

    this.loginClick = this.loginClick.bind(this)
***REMOVED***

  loginClick(): void ***REMOVED***
    userManager.signinRedirect()
***REMOVED***

  public render(): JSX.Element ***REMOVED***
    return (
      <div className="Login">
        <button
          type="submit"
          className="btn btn-primary"
          onClick=***REMOVED***this.loginClick***REMOVED***
        >
          Submit
        </button>
      </div>
    )
***REMOVED***
***REMOVED***

export default connect()(Login)
