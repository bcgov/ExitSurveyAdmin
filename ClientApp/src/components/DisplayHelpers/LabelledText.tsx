import React from 'react'

import './LabelledText.scss'

interface IProps ***REMOVED***
  text: React.ReactElement | string
  ignoreBlankText?: boolean
  helperText?: string
  label: string
***REMOVED***

class LabelledText extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    const text =
      !this.props.text && !this.props.ignoreBlankText ? (
        <span className="text-muted">[None]</span>
      ) : (
        this.props.text
      )
    return (
      <div className="LabelledText">
        <span className="Label">***REMOVED***this.props.label***REMOVED***</span>
        ***REMOVED***this.props.helperText && (
          <span className="HelperText">***REMOVED***this.props.helperText***REMOVED***</span>
        )***REMOVED***
        <span className="Text">***REMOVED***text***REMOVED***</span>
      </div>
    )
***REMOVED***
***REMOVED***

export default LabelledText
