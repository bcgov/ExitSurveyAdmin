import React from 'react'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import Unauthorized from '../Login/Unauthorized'
import userManager from '../../store/utils/userManager'

interface IOwnProps ***REMOVED***
  children: React.ReactNode
***REMOVED***

interface IStateProps ***REMOVED***
  user: any
***REMOVED***

interface IDispatchProps ***REMOVED******REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

class AuthWrapper extends React.Component<IProps> ***REMOVED***
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
