import React from 'react'

import './LabelledText.scss'

interface IProps ***REMOVED***
  children: React.ReactNode
  helperText?: string
  label: string
***REMOVED***

const LabelledText = (props: IProps): JSX.Element => ***REMOVED***
  return (
    <div className="LabelledText">
      <span className="Label">***REMOVED***props.label***REMOVED***</span>
      ***REMOVED***props.helperText && (
        <span className="HelperText">***REMOVED***props.helperText***REMOVED***</span>
      )***REMOVED***
      <span className="Text">***REMOVED***props.children***REMOVED***</span>
    </div>
  )
***REMOVED***

export default LabelledText
