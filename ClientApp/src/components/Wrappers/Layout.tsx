import React from 'react'

import NavMenu from '../NavMenu'

interface IProps ***REMOVED***
  children: React.ReactNode
***REMOVED***

const Layout = (props: IProps): JSX.Element => ***REMOVED***
  return (
    <div>
      <NavMenu />
      <div className=***REMOVED***`container-fluid`***REMOVED***>***REMOVED***props.children***REMOVED***</div>
    </div>
  )
***REMOVED***

export default Layout
