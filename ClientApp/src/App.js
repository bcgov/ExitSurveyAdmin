import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED*** Route ***REMOVED*** from 'react-router';
import ***REMOVED*** Layout ***REMOVED*** from './components/Layout';
import ***REMOVED*** Home ***REMOVED*** from './components/Home';
import ***REMOVED*** FetchData ***REMOVED*** from './components/FetchData';

import './custom.css'

export default class App extends Component ***REMOVED***
  static displayName = App.name;

  render () ***REMOVED***
    return (
      <Layout>
        <Route exact path='/' component=***REMOVED***Home***REMOVED*** />
        <Route path='/fetch-data' component=***REMOVED***FetchData***REMOVED*** />
      </Layout>
    );
***REMOVED***
***REMOVED***
