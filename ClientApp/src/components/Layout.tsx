import React from 'react'
import ***REMOVED*** NavMenu ***REMOVED*** from './NavMenu'

interface IProps ***REMOVED***
  children: JSX.Element | JSX.Element[]
***REMOVED***

export class Layout extends React.Component<IProps> ***REMOVED***
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
