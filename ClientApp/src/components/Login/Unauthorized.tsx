import React from 'react'
import userManager from '../../store/utils/userManager'

interface IOwnProps ***REMOVED***
  returnToPath: string
***REMOVED***

interface IStateProps ***REMOVED******REMOVED***

interface IDispatchProps ***REMOVED******REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

class Unauthorized extends React.Component<IProps> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)

    this.loginClick = this.loginClick.bind(this)
***REMOVED***

  loginClick(): void ***REMOVED***
    userManager.signinRedirect(***REMOVED***
      data: ***REMOVED***
        path: this.props.returnToPath || window.location.pathname
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

  render(): JSX.Element ***REMOVED***
    return (
      <div>
        <h1>You must log in to view this page.</h1>
        <button
          className="btn btn-lg btn-outline-primary mt-3"
          onClick=***REMOVED***this.loginClick***REMOVED***
        >
          Click here to log in &rarr;
        </button>
      </div>
    )
***REMOVED***
***REMOVED***

export default Unauthorized
