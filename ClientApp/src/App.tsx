import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { EmployeeListing } from './components/Employees/EmployeeListing'
import { AdminUserListing } from './components/AdminUsers/AdminUserListing'

import './custom.css'

export default class App extends React.Component {
  static displayName = App.name

  render(): JSX.Element {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/employees" component={EmployeeListing} />
        <Route path="/admin-users" component={AdminUserListing} />
      </Layout>
    )
  }
}
