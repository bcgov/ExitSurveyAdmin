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
    const ***REMOVED*** user ***REMOVED*** = this.props
    console.log('--> user', user)
    if (!user || user.expired) ***REMOVED***
      userManager.signinRedirect()
  ***REMOVED***
***REMOVED***

  componentDidMount(): void ***REMOVED***
    console.log('componentDidMount')
    // this.checkUser()
***REMOVED***

  componentDidUpdate(): void ***REMOVED***
    console.log('componentDidUpdate')
    this.checkUser()
***REMOVED***

  render(): React.ReactNode ***REMOVED***
    const ***REMOVED*** user ***REMOVED*** = this.props

    return !user || user.expired ? <Unauthorized /> : this.props.children
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
