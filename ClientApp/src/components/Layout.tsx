import React from 'react'
import ***REMOVED*** Container ***REMOVED*** from 'reactstrap'
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
        <Container>***REMOVED***this.props.children***REMOVED***</Container>
      </div>
    )
***REMOVED***
***REMOVED***
