import React from 'react'

import './LabelledText.scss'
import LabelledText from './LabelledText'

interface IProps {
  columnClass: string
  children: React.ReactNode
  helperText?: string
  label: string
}

class ColumnarLabelledText extends React.Component<IProps> {
  public static defaultProps = {
    columnClass: 'col-4'
  }

  render(): JSX.Element {
    const { columnClass, ...other } = this.props
    return (
      <div className={`ColumnarLabelledText ${columnClass}`}>
        <LabelledText {...other} />
      </div>
    )
  }
}

export default ColumnarLabelledText
