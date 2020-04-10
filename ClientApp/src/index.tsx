import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import ***REMOVED*** BrowserRouter ***REMOVED*** from 'react-router-dom'
import ***REMOVED*** Provider ***REMOVED*** from 'react-redux'
import ***REMOVED*** createStore ***REMOVED*** from 'redux'
import ***REMOVED*** persistReducer, persistStore ***REMOVED*** from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ***REMOVED*** PersistGate ***REMOVED*** from 'redux-persist/integration/react'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const baseUrl = document
  .getElementsByTagName('base')[0]
  .getAttribute('href') as string
const rootElement = document.getElementById('root')

const initialState = ***REMOVED***
  token: null
***REMOVED***

const persistConfig = ***REMOVED***
  key: 'ExitSurveyAdmin',
  storage
***REMOVED***

const reducer = (state = initialState, action: any): any => ***REMOVED***
  switch (action.type) ***REMOVED***
    case 'AUTH_SUCCESS': ***REMOVED***
      const ***REMOVED*** token ***REMOVED*** = action
      console.log('AUTH_SUCCESS token', token)
      return Object.assign(***REMOVED******REMOVED***, state, ***REMOVED***
        token
    ***REMOVED***)
  ***REMOVED***
    case 'LOGOUT':
      return Object.assign(***REMOVED******REMOVED***, initialState)
    default:
      return state
***REMOVED***
***REMOVED***

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer)

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store=***REMOVED***store***REMOVED***>
    <PersistGate loading=***REMOVED***'Loading...'***REMOVED*** persistor=***REMOVED***persistor***REMOVED***>
      <BrowserRouter basename=***REMOVED***baseUrl***REMOVED***>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  rootElement
)

registerServiceWorker()
