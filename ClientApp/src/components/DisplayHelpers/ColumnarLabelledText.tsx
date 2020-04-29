import React from 'react'

import './LabelledText.scss'
import LabelledText from './LabelledText'

interface IProps ***REMOVED***
  columnClass: string
  children: React.ReactNode
  helperText?: string
  label: string
***REMOVED***

class ColumnarLabelledText extends React.Component<IProps> ***REMOVED***
  public static defaultProps = ***REMOVED***
    columnClass: 'col-4'
***REMOVED***

  render(): JSX.Element ***REMOVED***
    const ***REMOVED*** columnClass, ...other ***REMOVED*** = this.props
    return (
      <div className=***REMOVED***`ColumnarLabelledText $***REMOVED***columnClass***REMOVED***`***REMOVED***>
        <LabelledText ***REMOVED***...other***REMOVED*** />
      </div>
    )
***REMOVED***
***REMOVED***

export default ColumnarLabelledText
