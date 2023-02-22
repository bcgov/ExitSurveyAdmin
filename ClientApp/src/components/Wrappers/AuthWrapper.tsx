import React from 'react'
import { connect } from 'react-redux'

import { FixTypeLater } from '../../types/FixTypeLater'
import { mapUserToPropsFromState } from '../../helpers/userHelper'
import Unauthorized from '../Login/Unauthorized'

interface OwnProps {
  children: React.ReactNode
}

interface StateProps {
  user: FixTypeLater
}

interface Props extends OwnProps, StateProps {}

class AuthWrapper extends React.Component<Props> {
  render(): React.ReactNode {
    const { user } = this.props

    return !user || user.expired ? <Unauthorized /> : this.props.children
  }
}

export default connect(mapUserToPropsFromState)(AuthWrapper)
