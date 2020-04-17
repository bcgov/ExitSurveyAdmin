import React from 'react'
import NavMenu from '../NavMenu'

import ErrorPage from './ErrorPage'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface IOwnProps {
  children: JSX.Element | JSX.Element[]
}

interface IStateProps {
  error: any
}

interface IDispatchProps {
  clearError: () => void
}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

class ContentWrapper extends React.Component<IProps> {
  componentDidMount(): void {
    this.props.clearError()
  }

  render(): JSX.Element {
    const error = this.props.error
    return (
      <div>
        {!error && this.props.children}
        {error && <ErrorPage />}
      </div>
    )
  }
}

const mapStateToProps = (state: any): IStateProps => {
  return {
    error: state.error.error as any
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    clearError: (): void => {
      dispatch({ type: 'CLEAR_ERROR' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper)
