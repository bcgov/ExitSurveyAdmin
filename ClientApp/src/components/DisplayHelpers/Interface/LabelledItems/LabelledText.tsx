import React from 'react'

import './LabelledText.scss'

interface Props ***REMOVED***
  children: React.ReactNode
  helperText?: string
  label: React.ReactNode
***REMOVED***

const LabelledText = (props: Props): JSX.Element => ***REMOVED***
  return (
    <div className="LabelledText">
      <span className="Label">***REMOVED***props.label***REMOVED***</span>
      ***REMOVED***props.helperText && <div className="HelperText">***REMOVED***props.helperText***REMOVED***</div>***REMOVED***
      <span className="Text">***REMOVED***props.children***REMOVED***</span>
    </div>
  )
***REMOVED***

export default LabelledText
