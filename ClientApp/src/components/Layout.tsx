import React from 'react'
import { Container } from 'reactstrap'
import { NavMenu } from './NavMenu'

interface IProps {
  children: JSX.Element | JSX.Element[]
}

export class Layout extends React.Component<IProps> {
  static displayName = Layout.name

  render(): JSX.Element {
    return (
      <div>
        <NavMenu />
        <Container>{this.props.children}</Container>
      </div>
    )
  }
}
