import ***REMOVED*** useEffect ***REMOVED*** from 'react'
import ***REMOVED*** Routes, Route, useLocation ***REMOVED*** from 'react-router'

import ***REMOVED*** frontendUrl, windowLocation ***REMOVED*** from '../helpers/envHelper'
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

const App = () => ***REMOVED***
  // If we get redirected here from a Keycloak logon, redirect the user to
  // the location we had saved for them before being redirected.
  const location = useLocation();
  const baseUrl = frontendUrl();

  useEffect(() => ***REMOVED***
    const href = windowLocation.get()
    // If the href is not the current location, and it is not the base URL,
    // redirect to the href. This is to handle the case where the user was
    // trying to access a protected resource before being redirected to login.
    if (href && href !== window.location.href && href !== baseUrl) ***REMOVED***
      window.location.href = href
  ***REMOVED***
***REMOVED*** [location])

  return (
    <Layout>
      <Routes>
        <Route path="/logout" element=***REMOVED***<LogoutPage />***REMOVED*** />
        <Route path="/status" element=***REMOVED***<HealthStatus />***REMOVED*** />
        <Route path="/employees/:employeeId" element=***REMOVED***<AuthenticatedRoute><EmployeeDetail /></AuthenticatedRoute>***REMOVED*** />
        <Route path="/employees" element=***REMOVED***<AuthenticatedRoute><EmployeeListing /></AuthenticatedRoute>***REMOVED*** />
        <Route path="/task-log-entries" element=***REMOVED***<AuthenticatedRoute><TaskLogEntryListing /></AuthenticatedRoute>***REMOVED*** />
        <Route path="/admin" element=***REMOVED***<AuthenticatedRoute><AdminInterface /></AuthenticatedRoute>***REMOVED*** />
        <Route path="/" element=***REMOVED***<AuthenticatedRoute><Home /></AuthenticatedRoute>***REMOVED*** />
      </Routes>
    </Layout>
  )
***REMOVED***

export default App
