import React from 'react'
import NavMenu from '../NavMenu'

interface IProps {
  children: JSX.Element | JSX.Element[]
}

class Layout extends React.Component<IProps> {
  static displayName = Layout.name

  render(): JSX.Element {
    return (
      <div>
        <NavMenu />
        <div className="container">{this.props.children}</div>
      </div>
    )
  }
}

export default Layout
