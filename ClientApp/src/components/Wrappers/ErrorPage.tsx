import React from 'react'
import ***REMOVED*** connect ***REMOVED*** from 'react-redux'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import LabelledText from '../DisplayHelpers/Interface/LabelledItems/LabelledText'

const smallCodeWrapper = (content: string): JSX.Element => (
  <code>
    <small>***REMOVED***content***REMOVED***</small>
  </code>
)

interface IProps ***REMOVED***
  error?: FixTypeLater
***REMOVED***

class ErrorPage extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const error = this.props.error.error
    return (
      <div className="ErrorPage">
        <h3>***REMOVED***error ? error.title : 'Error'***REMOVED***</h3>
        <div className="alert alert-danger" role="alert">
          <strong>An error occurred with code:</strong> ***REMOVED***error.code***REMOVED***
        </div>
        <p>
          If you believe you have received this message in error, please contact
          us, copying and pasting the following data.
        </p>
        <LabelledText label="URL">
          ***REMOVED***smallCodeWrapper(window.location.href)***REMOVED***
        </LabelledText>
        <LabelledText label="Timestamp">
          ***REMOVED***smallCodeWrapper(new Date().toString())***REMOVED***
        </LabelledText>
        <LabelledText label="Current state">
          ***REMOVED***smallCodeWrapper(JSON.stringify(this.props, null, 2))***REMOVED***
        </LabelledText>
      </div>
    )
***REMOVED***
***REMOVED***

const mapStateToProps = (state: FixTypeLater): FixTypeLater => (***REMOVED***
  error: state.error
***REMOVED***)

export default connect(mapStateToProps)(ErrorPage)
