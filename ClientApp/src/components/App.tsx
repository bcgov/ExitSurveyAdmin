import { Route } from 'react-router-dom'
import React, { useEffect } from 'react'

import { windowLocation } from '../helpers/envHelper'
import AdminInterface from './Admin/AdminInterface'
import AuthenticatedRoute from './Wrappers/AuthenticatedRoute'
import EmployeeDetail from './Employees/EmployeeDetail/EmployeeDetail'
import EmployeeListing from './Employees/EmployeeListing'
import HealthStatus from './HealthStatus/HealthStatus'
import Home from './Home'
import Layout from './Wrappers/Layout'
import LogoutPage from './Login/LogoutPage'
import TaskLogEntryListing from './TaskLogEntries/TaskLogEntryListing'

import '../custom.css'

const App = () => {
  // If we get redirected here from a Keycloak logon, redirect the user to
  // the location we had saved for them before being redirected.
  useEffect(() => {
    const href = windowLocation.get()
    if (href) {
      window.location.href = href
    }
  }, [])

  return (
    <Layout>
      <AuthenticatedRoute exact path="/" component={Home} />
      <Route path="/logout" component={LogoutPage} />
      <Route path="/status" component={HealthStatus} />
      <AuthenticatedRoute
        exact
        path="/employees/:employeeId"
        component={EmployeeDetail}
      />
      <AuthenticatedRoute exact path="/employees" component={EmployeeListing} />
      <AuthenticatedRoute
        exact
        path="/task-log-entries"
        component={TaskLogEntryListing}
      />
      <AuthenticatedRoute exact path="/admin" component={AdminInterface} />
    </Layout>
  )
}

export default App
