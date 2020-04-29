// import 'bootstrap/dist/css/bootstrap.css'
// import '@bcgov/bootstrap-theme/dist/scss/bootstrap-theme'
import './App.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import ***REMOVED*** BrowserRouter ***REMOVED*** from 'react-router-dom'
import ***REMOVED*** Provider ***REMOVED*** from 'react-redux'
// import ***REMOVED*** persistStore ***REMOVED*** from 'redux-persist'
// import ***REMOVED*** PersistGate ***REMOVED*** from 'redux-persist/integration/react'
import App from './App'
import ***REMOVED*** unregister ***REMOVED*** from './registerServiceWorker'
import ***REMOVED*** OidcProvider ***REMOVED*** from 'redux-oidc'
import userManager from './store/utils/userManager'
import store from './store/store'

const baseUrl = document
  .getElementsByTagName('base')[0]
  .getAttribute('href') as string
const rootElement = document.getElementById('root')

// const persistor = persistStore(store)

ReactDOM.render(
  <Provider store=***REMOVED***store***REMOVED***>
    <OidcProvider store=***REMOVED***store***REMOVED*** userManager=***REMOVED***userManager***REMOVED***>
      ***REMOVED***/* <PersistGate loading=***REMOVED***'Loading...'***REMOVED*** persistor=***REMOVED***persistor***REMOVED***> */***REMOVED***
      <BrowserRouter basename=***REMOVED***baseUrl***REMOVED***>
        <App />
      </BrowserRouter>
      ***REMOVED***/* </PersistGate> */***REMOVED***
    </OidcProvider>
  </Provider>,
  rootElement
)

// registerServiceWorker()
unregister()
