import React from 'react'

import './LabelledText.scss'

interface IProps ***REMOVED***
  children: React.ReactNode
  helperText?: string
  label: string
***REMOVED***

class LabelledText extends React.Component<IProps> ***REMOVED***
  render(): JSX.Element ***REMOVED***
    return (
      <div className="LabelledText">
        <span className="Label">***REMOVED***this.props.label***REMOVED***</span>
        ***REMOVED***this.props.helperText && (
          <span className="HelperText">***REMOVED***this.props.helperText***REMOVED***</span>
        )***REMOVED***
        <span className="Text">***REMOVED***this.props.children***REMOVED***</span>
      </div>
    )
***REMOVED***
***REMOVED***

export default LabelledText
