import React from 'react'

import './LabelledItem.scss'

interface Props {
  children: React.ReactNode
}

export default class LabelledSelect extends React.Component<Props> {
  public render(): JSX.Element {
    return <div className="LabelledItem form-group">{this.props.children}</div>
  }
}
