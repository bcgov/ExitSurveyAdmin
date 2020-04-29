import React from 'react'
import { Route } from 'react-router-dom'
import Layout from './components/Wrappers/Layout'
import Home from './components/Home'
import CallbackHandler from './components/Login/CallbackHandler'
import EmployeeDetail from './components/Employees/EmployeeDetail'
import EmployeeListing from './components/Employees/EmployeeListing'
import TaskLogEntryListing from './components/TaskLogEntries/TaskLogEntryListing'
// import AuthenticatedRoute from './components/Wrappers/AuthenticatedRoute'

import './custom.css'

export default class App extends React.Component {
  static displayName = App.name

  render(): JSX.Element {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={CallbackHandler} />
        <Route exact path="/employees/:employeeId" component={EmployeeDetail} />
        <Route exact path="/employees" component={EmployeeListing} />
        <Route exact path="/task-log-entries" component={TaskLogEntryListing} />
      </Layout>
    )
  }
}
