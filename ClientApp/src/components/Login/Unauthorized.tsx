import React from 'react'
import { connect } from 'react-redux'
import userManager from '../../store/utils/userManager'

interface IOwnProps {}

interface IStateProps {
  user: any
}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

class Unauthorized extends React.Component<IProps> {
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
    this.checkUser()
  }

  componentDidUpdate(): void {
    console.log('componentDidUpdate')
    this.checkUser()
  }
  render(): JSX.Element {
    return <h1>Unauthorized. Redirecting you...</h1>
  }
}

const mapStateToProps = (state: any): IStateProps => {
  if (state && state.oidc && state.oidc.user) {
    return { user: state.oidc.user }
  } else {
    return { user: undefined }
  }
}

export default connect(mapStateToProps)(Unauthorized)
