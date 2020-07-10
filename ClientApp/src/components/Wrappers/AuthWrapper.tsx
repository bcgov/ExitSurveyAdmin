import React from 'react'
import { connect } from 'react-redux'

import { FixTypeLater } from '../../types/FixTypeLater'
import { mapUserToPropsFromState } from '../../helpers/userHelper'
import Unauthorized from '../Login/Unauthorized'

interface IOwnProps {
  children: React.ReactNode
}

interface IStateProps {
  user: FixTypeLater
}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

class AuthWrapper extends React.Component<IProps> {
  render(): React.ReactNode {
    const { user } = this.props

    return !user || user.expired ? <Unauthorized /> : this.props.children
  }
}

export default connect(mapUserToPropsFromState)(AuthWrapper)
