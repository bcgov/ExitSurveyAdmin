import React from 'react'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import userManager from '../../store/utils/userManager'

import Unauthorized from '../Login/Unauthorized'

interface IOwnProps ***REMOVED***
  children: React.ReactNode
***REMOVED***

interface IStateProps ***REMOVED***
  user: any
***REMOVED***

interface IDispatchProps ***REMOVED******REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

class AuthWrapper extends React.Component<IProps> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)
    this.checkUser = this.checkUser.bind(this)
***REMOVED***

  checkUser(): void ***REMOVED***
    console.log('AuthWrapper: checkUser')
    const ***REMOVED*** user ***REMOVED*** = this.props
    if (!user || user.expired)
      userManager.signinRedirect(***REMOVED***
        data: ***REMOVED***
          path: window.location.pathname
      ***REMOVED***
    ***REMOVED***)
***REMOVED***

  componentDidMount(): void ***REMOVED***
    console.log('AuthWrapper: componentDidMount')
    // this.checkUser()
***REMOVED***

  componentDidUpdate(prevProps: IProps): void ***REMOVED***
    console.log(
      'AuthWrapper: componentDidUpdate',
      prevProps.user,
      this.props.user
    )
    this.checkUser()
***REMOVED***

  render(): React.ReactNode ***REMOVED***
    const ***REMOVED*** user ***REMOVED*** = this.props

    const returnToPath = window.location.pathname

    return !user || user.expired ? (
      <Unauthorized returnToPath=***REMOVED***returnToPath***REMOVED*** />
    ) : (
      this.props.children
    )
***REMOVED***
***REMOVED***

const mapStateToProps = (state: any): IStateProps => ***REMOVED***
  if (state && state.oidc && state.oidc.user) ***REMOVED***
    return ***REMOVED*** user: state.oidc.user ***REMOVED***
***REMOVED*** else ***REMOVED***
    return ***REMOVED*** user: undefined ***REMOVED***
***REMOVED***
***REMOVED***

export default connect(mapStateToProps)(AuthWrapper)
