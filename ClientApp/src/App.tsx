import React from 'react'
import ***REMOVED*** Route ***REMOVED*** from 'react-router-dom'
import ***REMOVED*** Layout ***REMOVED*** from './components/Layout'
import ***REMOVED*** Home ***REMOVED*** from './components/Home'
import Login from './components/Login/Login'
import CallbackHandler from './components/Login/CallbackHandler'
import ***REMOVED*** EmployeeListing ***REMOVED*** from './components/Employees/EmployeeListing'

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
