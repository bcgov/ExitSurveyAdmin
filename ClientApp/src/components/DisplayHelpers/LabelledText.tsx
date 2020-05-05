import React from 'react'

import './LabelledText.scss'

interface IProps {
  children: React.ReactNode
  helperText?: string
  label: string
}

const LabelledText = (props: IProps): JSX.Element => {
  return (
    <div className="LabelledText">
      <span className="Label">{props.label}</span>
      {props.helperText && (
        <span className="HelperText">{props.helperText}</span>
      )}
      <span className="Text">{props.children}</span>
    </div>
  )
}

export default LabelledText
