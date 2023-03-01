import ***REMOVED*** Route ***REMOVED*** from 'react-router-dom'
import React, ***REMOVED*** useEffect ***REMOVED*** from 'react'

import ***REMOVED*** windowLocation ***REMOVED*** from '../helpers/envHelper'
import AdminInterface from './Admin/AdminInterface'
import AuthenticatedRoute from './Wrappers/AuthenticatedRoute'
import EmployeeDetail from './Employees/EmployeeDetail'
import EmployeeListing from './Employees/EmployeeListing'
import HealthStatus from './HealthStatus/HealthStatus'
import Home from './Home'
import Layout from './Wrappers/Layout'
import LogoutPage from './Login/LogoutPage'
import TaskLogEntryListing from './TaskLogEntries/TaskLogEntryListing'

import '../custom.css'

const App = () => ***REMOVED***
  // If we get redirected here from a Keycloak logon, redirect the user to
  // the location we had saved for them before being redirected.
  useEffect(() => ***REMOVED***
    const href = windowLocation.get()
    if (href) ***REMOVED***
      window.location.href = href
  ***REMOVED***
***REMOVED*** [])

  return (
    <Layout>
      <AuthenticatedRoute exact path="/" component=***REMOVED***Home***REMOVED*** />
      <Route path="/logout" component=***REMOVED***LogoutPage***REMOVED*** />
      <Route path="/status" component=***REMOVED***HealthStatus***REMOVED*** />
      <AuthenticatedRoute
        exact
        path="/employees/:employeeId"
        component=***REMOVED***EmployeeDetail***REMOVED***
      />
      <AuthenticatedRoute exact path="/employees" component=***REMOVED***EmployeeListing***REMOVED*** />
      <AuthenticatedRoute
        exact
        path="/task-log-entries"
        component=***REMOVED***TaskLogEntryListing***REMOVED***
      />
      <AuthenticatedRoute exact path="/admin" component=***REMOVED***AdminInterface***REMOVED*** />
    </Layout>
  )
***REMOVED***

export default App
