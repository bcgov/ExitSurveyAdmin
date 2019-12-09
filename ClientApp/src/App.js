import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED*** Route ***REMOVED*** from 'react-router';
import ***REMOVED*** Layout ***REMOVED*** from './components/Layout';
import ***REMOVED*** Home ***REMOVED*** from './components/Home';
import ***REMOVED*** EmployeeListing ***REMOVED*** from './components/Employees/EmployeeListing';
import ***REMOVED*** AdminUserListing ***REMOVED*** from './components/AdminUsers/AdminUserListing';

import './custom.css'

export default class App extends Component ***REMOVED***
  static displayName = App.name;

  render () ***REMOVED***
    return (
      <Layout>
        <Route exact path='/' component=***REMOVED***Home***REMOVED*** />
        <Route path='/employees' component=***REMOVED***EmployeeListing***REMOVED*** />
        <Route path='/admin-users' component=***REMOVED***AdminUserListing***REMOVED*** />
      </Layout>
    );
***REMOVED***
***REMOVED***
