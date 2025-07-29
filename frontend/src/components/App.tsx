import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { frontendUrl, windowLocation } from '../helpers/envHelper'
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
  const location = useLocation();
  const baseUrl = frontendUrl();

  useEffect(() => {
    const href = windowLocation.get()
    
    // Only redirect if:
    // 1. There's a saved location
    // 2. It's different from current location
    // 3. It's not the base URL
    // 4. We haven't already processed this redirect (prevent loops)
    if (href && href !== window.location.href && href !== baseUrl) {
      windowLocation.remove() // Clear immediately to prevent redirect loops
      window.location.href = href
    } else if (href) {
      // If there's a saved location but we're already there, clear it
      windowLocation.remove()
    }
  }, [location])

  return (
    <Layout>
      <Routes>
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/status" element={<HealthStatus />} />
        <Route path="/employees/:employeeId" element={<AuthenticatedRoute><EmployeeDetail /></AuthenticatedRoute>} />
        <Route path="/employees" element={<AuthenticatedRoute><EmployeeListing /></AuthenticatedRoute>} />
        <Route path="/task-log-entries" element={<AuthenticatedRoute><TaskLogEntryListing /></AuthenticatedRoute>} />
        <Route path="/admin" element={<AuthenticatedRoute><AdminInterface /></AuthenticatedRoute>} />
        <Route path="/" element={<AuthenticatedRoute><Home /></AuthenticatedRoute>} />
      </Routes>
    </Layout>
  )
}

export default App
