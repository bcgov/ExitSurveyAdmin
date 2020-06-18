import React from 'react'
import { connect } from 'react-redux'
import LabelledText from '../DisplayHelpers/Interface/LabelledItems/LabelledText'

const smallCodeWrapper = (content: string) => (
  <code>
    <small>{content}</small>
  </code>
)

interface IProps {
  error?: any
}

class ErrorPage extends React.Component<IProps> {
  render(): JSX.Element {
    const error = this.props.error.error
    return (
      <div className="ErrorPage">
        <h3>{error ? error.title : 'Error'}</h3>
        <div className="alert alert-danger" role="alert">
          <strong>An error occurred with code:</strong> {error.code}
        </div>
        <p>
          If you believe you have received this message in error, please contact
          us, copying and pasting the following data.
        </p>
        <LabelledText label="URL">
          {smallCodeWrapper(window.location.href)}
        </LabelledText>
        <LabelledText label="Timestamp">
          {smallCodeWrapper(new Date().toString())}
        </LabelledText>
        <LabelledText label="Current state">
          {smallCodeWrapper(JSON.stringify(this.props, null, 2))}
        </LabelledText>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  error: state.error
})

export default connect(mapStateToProps)(ErrorPage)
