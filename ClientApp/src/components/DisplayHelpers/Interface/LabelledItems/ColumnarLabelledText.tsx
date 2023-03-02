import React from 'react'

import './LabelledText.scss'
import LabelledText from './LabelledText'

interface Props ***REMOVED***
  children: React.ReactNode
  columnClass?: string
  extraClasses?: string
  helperText?: string
  label: React.ReactNode
***REMOVED***

const ColumnarLabelledText = (***REMOVED***
  columnClass = 'col-4',
  extraClasses,
  ...other
***REMOVED***: Props): JSX.Element => ***REMOVED***
  return (
    <div
      className=***REMOVED***`ColumnarLabelledText $***REMOVED***columnClass***REMOVED*** $***REMOVED***extraClasses || ''***REMOVED***`***REMOVED***
    >
      <LabelledText ***REMOVED***...other***REMOVED*** />
    </div>
  )
***REMOVED***

export default ColumnarLabelledText
