import React from 'react'
import NavMenu from '../NavMenu'

interface IProps ***REMOVED***
  children: JSX.Element | JSX.Element[]
***REMOVED***

class Layout extends React.Component<IProps> ***REMOVED***
  static displayName = Layout.name

  render(): JSX.Element ***REMOVED***
    return (
      <div>
        <NavMenu />
        <div className="container">***REMOVED***this.props.children***REMOVED***</div>
      </div>
    )
***REMOVED***
***REMOVED***

export default Layout
