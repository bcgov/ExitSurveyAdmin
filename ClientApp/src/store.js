import ***REMOVED*** applyMiddleware, combineReducers, compose, createStore ***REMOVED*** from 'redux'
import ***REMOVED*** browserHistory ***REMOVED*** from 'react-router'
import ***REMOVED***
  routerMiddleware,
  routerReducer,
  syncHistoryWithStore
***REMOVED*** from 'connected-react-router'
import ***REMOVED*** createUserManager, loadUser ***REMOVED*** from 'redux-oidc'
import reducer from './reducer'
import userManager from './utils/userManager'

// create the middleware with the userManager
// const oidcMiddleware = createOidcMiddleware(userManager);

const loggerMiddleware = store => next => action => ***REMOVED***
  console.log('Action type:', action.type)
  console.log('Action payload:', action.payload)
  console.log('State before:', store.getState())
  next(action)
  console.log('State after:', store.getState())
***REMOVED***

const initialState = ***REMOVED******REMOVED***

const createStoreWithMiddleware = compose(
  applyMiddleware(loggerMiddleware, routerMiddleware(browserHistory))
)(createStore)

const store = createStoreWithMiddleware(reducer, initialState)
loadUser(store, userManager)

export default store
