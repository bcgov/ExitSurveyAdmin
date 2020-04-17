import React from 'react'
import { connect } from 'react-redux'
import userManager from '../../store/utils/userManager'

import Unauthorized from '../Login/Unauthorized'

interface IOwnProps {
  children: React.ReactNode
}

interface IStateProps {
  user: any
}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

class AuthWrapper extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    this.checkUser = this.checkUser.bind(this)
  }

  checkUser(): void {
    const { user } = this.props
    console.log('--> user', user)
    if (!user || user.expired) {
      userManager.signinRedirect()
    }
  }

  componentDidMount(): void {
    console.log('componentDidMount')
    // this.checkUser()
  }

  componentDidUpdate(): void {
    console.log('componentDidUpdate')
    this.checkUser()
  }

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
