import React from 'react'

import ErrorPage from './ErrorPage'

import ***REMOVED*** connect ***REMOVED*** from 'react-redux'
import ***REMOVED*** Dispatch ***REMOVED*** from 'redux'

interface IOwnProps ***REMOVED***
  children: JSX.Element | JSX.Element[]
***REMOVED***

interface IStateProps ***REMOVED***
  error: any
***REMOVED***

interface IDispatchProps ***REMOVED***
  clearError: () => void
***REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

class ContentWrapper extends React.Component<IProps> ***REMOVED***
  componentDidMount(): void ***REMOVED***
    this.props.clearError()
***REMOVED***

  render(): JSX.Element ***REMOVED***
    const error = this.props.error
    return (
      <div>
        ***REMOVED***!error && this.props.children***REMOVED***
        ***REMOVED***error && <ErrorPage />***REMOVED***
      </div>
    )
***REMOVED***
***REMOVED***

const mapStateToProps = (state: any): IStateProps => ***REMOVED***
  return ***REMOVED***
    error: state.error.error as any
***REMOVED***
***REMOVED***

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ***REMOVED***
  return ***REMOVED***
    clearError: (): void => ***REMOVED***
      dispatch(***REMOVED*** type: 'CLEAR_ERROR' ***REMOVED***)
  ***REMOVED***
***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper)
