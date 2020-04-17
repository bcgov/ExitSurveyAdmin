import React from 'react'
import ***REMOVED*** Route ***REMOVED*** from 'react-router-dom'
import Layout from './components/Wrappers/Layout'
import Home from './components/Home'
import Login from './components/Login/Login'
import CallbackHandler from './components/Login/CallbackHandler'
import EmployeeListing from './components/Employees/EmployeeListing'
// import AuthWrapper from './AuthWrapper'

import './custom.css'

export default class App extends React.Component ***REMOVED***
  static displayName = App.name

  render(): JSX.Element ***REMOVED***
    return (
      <Layout>
        <Route exact path="/" component=***REMOVED***Home***REMOVED*** />
        <Route path="/login" component=***REMOVED***Login***REMOVED*** />
        <Route path="/callback" component=***REMOVED***CallbackHandler***REMOVED*** />
        <Route path="/employees" component=***REMOVED***EmployeeListing***REMOVED*** />
      </Layout>
    )
***REMOVED***
***REMOVED***
