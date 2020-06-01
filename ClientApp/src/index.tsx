import './App.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import ***REMOVED*** BrowserRouter ***REMOVED*** from 'react-router-dom'
import ***REMOVED*** Provider ***REMOVED*** from 'react-redux'
import App from './App'
import ***REMOVED*** unregister ***REMOVED*** from './registerServiceWorker'
import ***REMOVED*** OidcProvider ***REMOVED*** from 'redux-oidc'
import userManager from './store/utils/userManager'
import store from './store/store'
import ***REMOVED*** routerBase as getRouterBasename ***REMOVED*** from './helpers/envHelper'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store=***REMOVED***store***REMOVED***>
    <OidcProvider store=***REMOVED***store***REMOVED*** userManager=***REMOVED***userManager***REMOVED***>
      ***REMOVED***/* <PersistGate loading=***REMOVED***'Loading...'***REMOVED*** persistor=***REMOVED***persistor***REMOVED***> */***REMOVED***
      <BrowserRouter basename=***REMOVED***getRouterBasename()***REMOVED***>
        <App />
      </BrowserRouter>
      ***REMOVED***/* </PersistGate> */***REMOVED***
    </OidcProvider>
  </Provider>,
  rootElement
)

// registerServiceWorker()
unregister()
