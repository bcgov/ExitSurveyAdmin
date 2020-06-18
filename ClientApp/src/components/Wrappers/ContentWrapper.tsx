import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { FixTypeLater } from '../../types/FixTypeLater'
import ErrorPage from './ErrorPage'

interface IOwnProps {
  children: JSX.Element | JSX.Element[]
}

interface IStateProps {
  error: FixTypeLater
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

const mapStateToProps = (state: FixTypeLater): IStateProps => {
  return {
    error: state.error.error as FixTypeLater
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
