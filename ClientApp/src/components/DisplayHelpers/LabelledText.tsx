import React from 'react'

import './LabelledText.scss'

interface IProps {
  text: React.ReactElement | string
  ignoreBlankText?: boolean
  helperText?: string
  label: string
}

class LabelledText extends React.Component<IProps> {
  render(): JSX.Element {
    const text =
      !this.props.text && !this.props.ignoreBlankText ? (
        <span className="text-muted">[None]</span>
      ) : (
        this.props.text
      )
    return (
      <div className="LabelledText">
        <span className="Label">{this.props.label}</span>
        {this.props.helperText && (
          <span className="HelperText">{this.props.helperText}</span>
        )}
        <span className="Text">{text}</span>
      </div>
    )
  }
}

export default LabelledText
