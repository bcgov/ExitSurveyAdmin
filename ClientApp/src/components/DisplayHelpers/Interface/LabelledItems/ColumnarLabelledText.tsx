import React from 'react'

import './LabelledText.scss'
import LabelledText from './LabelledText'

interface IProps ***REMOVED***
  columnClass?: string
  children: React.ReactNode
  helperText?: string
  label: React.ReactNode
***REMOVED***

const ColumnarLabelledText = (***REMOVED***
  columnClass = 'col-4',
  ...other
***REMOVED***: IProps): JSX.Element => ***REMOVED***
  return (
    <div className=***REMOVED***`ColumnarLabelledText $***REMOVED***columnClass***REMOVED***`***REMOVED***>
      <LabelledText ***REMOVED***...other***REMOVED*** />
    </div>
  )
***REMOVED***

export default ColumnarLabelledText
