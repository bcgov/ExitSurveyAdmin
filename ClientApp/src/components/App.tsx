import React from 'react'
import { Route } from 'react-router-dom'
import Layout from './Wrappers/Layout'
import Home from './Home'
import CallbackHandler from './Login/CallbackHandler'
import EmployeeDetail from './Employees/EmployeeDetail'
import EmployeeListing from './Employees/EmployeeListing'
import TaskLogEntryListing from './TaskLogEntries/TaskLogEntryListing'
import AuthenticatedRoute from './Wrappers/AuthenticatedRoute'

import '../custom.css'

export default class App extends React.Component {
  static displayName = App.name

  render(): JSX.Element {
    return (
      <Layout>
        <AuthenticatedRoute exact path="/" component={Home} />
        <Route path="/callback" component={CallbackHandler} />
        <AuthenticatedRoute
          exact
          path="/employees/:employeeId"
          component={EmployeeDetail}
        />
        <AuthenticatedRoute
          exact
          path="/employees"
          component={EmployeeListing}
        />
        <AuthenticatedRoute
          exact
          path="/task-log-entries"
          component={TaskLogEntryListing}
        />
      </Layout>
    )
  }
}
