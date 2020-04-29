import React from 'react'
import ***REMOVED*** Route ***REMOVED*** from 'react-router-dom'
import Layout from './components/Wrappers/Layout'
import Home from './components/Home'
import CallbackHandler from './components/Login/CallbackHandler'
import EmployeeDetail from './components/Employees/EmployeeDetail'
import EmployeeListing from './components/Employees/EmployeeListing'
import TaskLogEntryListing from './components/TaskLogEntries/TaskLogEntryListing'
// import AuthenticatedRoute from './components/Wrappers/AuthenticatedRoute'

import './custom.css'

export default class App extends React.Component ***REMOVED***
  static displayName = App.name

  render(): JSX.Element ***REMOVED***
    return (
      <Layout>
        <Route exact path="/" component=***REMOVED***Home***REMOVED*** />
        <Route path="/callback" component=***REMOVED***CallbackHandler***REMOVED*** />
        <Route exact path="/employees/:employeeId" component=***REMOVED***EmployeeDetail***REMOVED*** />
        <Route exact path="/employees" component=***REMOVED***EmployeeListing***REMOVED*** />
        <Route exact path="/task-log-entries" component=***REMOVED***TaskLogEntryListing***REMOVED*** />
      </Layout>
    )
***REMOVED***
***REMOVED***
