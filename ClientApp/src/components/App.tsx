import React from 'react'
import ***REMOVED*** Route ***REMOVED*** from 'react-router-dom'

import AuthenticatedRoute from './Wrappers/AuthenticatedRoute'
import CallbackHandler from './Login/CallbackHandler'
import EmployeeDetail from './Employees/EmployeeDetail'
import EmployeeListing from './Employees/EmployeeListing'
import Home from './Home'
import Layout from './Wrappers/Layout'
import TaskLogEntryListing from './TaskLogEntries/TaskLogEntryListing'
import AdminInterface from './Admin/AdminInterface'

import '../custom.css'

export default class App extends React.Component ***REMOVED***
  static displayName = App.name

  render(): JSX.Element ***REMOVED***
    return (
      <Layout>
        <AuthenticatedRoute exact path="/" component=***REMOVED***Home***REMOVED*** />
        <Route path="/callback" component=***REMOVED***CallbackHandler***REMOVED*** />
        <AuthenticatedRoute
          exact
          path="/employees/:employeeId"
          component=***REMOVED***EmployeeDetail***REMOVED***
        />
        <AuthenticatedRoute
          exact
          path="/employees"
          component=***REMOVED***EmployeeListing***REMOVED***
        />
        <AuthenticatedRoute
          exact
          path="/task-log-entries"
          component=***REMOVED***TaskLogEntryListing***REMOVED***
        />
        <AuthenticatedRoute exact path="/admin" component=***REMOVED***AdminInterface***REMOVED*** />
      </Layout>
    )
***REMOVED***
***REMOVED***
