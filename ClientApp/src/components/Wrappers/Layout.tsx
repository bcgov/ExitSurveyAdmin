import React from 'react'
import NavMenu from '../NavMenu'

interface IProps ***REMOVED***
  children: React.ReactNode
***REMOVED***

class Layout extends React.Component<IProps> ***REMOVED***
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
