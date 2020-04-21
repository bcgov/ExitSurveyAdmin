import React from 'react'

import './LabelledText.scss'

interface IProps {
  children: React.ReactNode
  helperText?: string
  label: string
}

class LabelledText extends React.Component<IProps> {
  render(): JSX.Element {
    return (
      <div className="LabelledText">
        <span className="Label">{this.props.label}</span>
        {this.props.helperText && (
          <span className="HelperText">{this.props.helperText}</span>
        )}
        <span className="Text">{this.props.children}</span>
      </div>
    )
  }
}

export default LabelledText
