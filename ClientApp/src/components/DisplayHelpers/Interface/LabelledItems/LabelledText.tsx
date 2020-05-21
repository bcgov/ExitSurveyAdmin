import React from 'react'

import './LabelledItem.scss'

interface IProps {
  title: string
  text: React.ReactNode
}

export default class LabelledText extends React.Component<IProps> {
  public render(): JSX.Element {
    return (
      <div className="LabelledItem mb-3">
        <label>{this.props.title}</label>
        <div>{this.props.text}</div>
      </div>
    )
  }
}
