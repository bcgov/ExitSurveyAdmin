import React from 'react'

import NavMenu from '../NavMenu'

interface Props {
  children: React.ReactNode
}

const Layout = (props: Props): JSX.Element => {
  return (
    <div>
      <NavMenu />
      <div className={`container-fluid`}>{props.children}</div>
    </div>
  )
}

export default Layout
