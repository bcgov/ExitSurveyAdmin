import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EmployeeListing } from './components/Employees/EmployeeListing';
import { AdminUserListing } from './components/AdminUsers/AdminUserListing';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/employees' component={EmployeeListing} />
        <Route path='/admin-users' component={AdminUserListing} />
      </Layout>
    );
  }
}
