import React from 'react'

import './LabelledItem.scss'

interface IProps {
  children: React.ReactNode
}

export default class LabelledSelect extends React.Component<IProps> {
  public render(): JSX.Element {
    return <div className="LabelledItem form-group">{this.props.children}</div>
  }
}
