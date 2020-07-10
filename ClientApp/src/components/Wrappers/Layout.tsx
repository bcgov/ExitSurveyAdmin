import React from 'react'

import NavMenu from '../NavMenu'

interface IProps {
  children: React.ReactNode
}

const Layout = (props: IProps): JSX.Element => {
  return (
    <div>
      <NavMenu />
      <div className={`container-fluid`}>{props.children}</div>
    </div>
  )
}

export default Layout
