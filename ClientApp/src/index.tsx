import 'reflect-metadata'

import ***REMOVED*** HashRouter ***REMOVED*** from 'react-router-dom'
import ***REMOVED*** OidcProvider ***REMOVED*** from 'redux-oidc'
import ***REMOVED*** Provider ***REMOVED*** from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import ***REMOVED*** routerBase as getRouterBasename ***REMOVED*** from './helpers/envHelper'
import ***REMOVED*** unregister ***REMOVED*** from './registerServiceWorker'
import App from './components/App'
import store from './store/store'
import userManager from './store/utils/userManager'

import './components/App.scss'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store=***REMOVED***store***REMOVED***>
    <OidcProvider store=***REMOVED***store***REMOVED*** userManager=***REMOVED***userManager***REMOVED***>
      ***REMOVED***/* <PersistGate loading=***REMOVED***'Loading...'***REMOVED*** persistor=***REMOVED***persistor***REMOVED***> */***REMOVED***
      <HashRouter basename=***REMOVED***getRouterBasename()***REMOVED***>
        <App />
      </HashRouter>
      ***REMOVED***/* </PersistGate> */***REMOVED***
    </OidcProvider>
  </Provider>,
  rootElement
)

// registerServiceWorker()
unregister()
