import React from 'react'
import NavMenu from '../NavMenu'

interface IProps {
  children: React.ReactNode
}

class Layout extends React.Component<IProps> {
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
