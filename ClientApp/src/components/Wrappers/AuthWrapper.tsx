import React from 'react'
import { connect } from 'react-redux'
import Unauthorized from '../Login/Unauthorized'
import userManager from '../../store/utils/userManager'

interface IOwnProps {
  children: React.ReactNode
}

interface IStateProps {
  user: any
}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

class AuthWrapper extends React.Component<IProps> {
  render(): React.ReactNode {
    const { user } = this.props

    return !user || user.expired ? <Unauthorized /> : this.props.children
  }
}

const mapStateToProps = (state: any): IStateProps => {
  if (state && state.oidc && state.oidc.user) {
    return { user: state.oidc.user }
  } else {
    return { user: undefined }
  }
}

export default connect(mapStateToProps)(AuthWrapper)
