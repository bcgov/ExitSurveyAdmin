import React from 'react'
import { connect } from 'react-redux'
import userManager from '../../store/utils/userManager'

import Unauthorized from '../Login/Unauthorized'
import { getSigninRedirectOptions } from '../../helpers/envHelper'

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
    console.log('AuthWrapper: checkUser()')
    const { user } = this.props
    if (!user || user.expired) {
      userManager.signinRedirect(getSigninRedirectOptions())
    }
  }

  componentDidMount(): void {
    console.log('AuthWrapper: componentDidMount')
    // this.checkUser()
  }

  componentDidUpdate(prevProps: IProps): void {
    console.log(
      'AuthWrapper: componentDidUpdate',
      prevProps.user,
      this.props.user
    )
    //this.checkUser()
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
