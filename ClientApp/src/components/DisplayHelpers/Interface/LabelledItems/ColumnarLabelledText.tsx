import React from 'react'

import './LabelledText.scss'
import LabelledText from './LabelledText'

interface IProps {
  columnClass?: string
  children: React.ReactNode
  helperText?: string
  label: React.ReactNode
}

const ColumnarLabelledText = ({
  columnClass = 'col-4',
  ...other
}: IProps): JSX.Element => {
  return (
    <div className={`ColumnarLabelledText ${columnClass}`}>
      <LabelledText {...other} />
    </div>
  )
}

export default ColumnarLabelledText
