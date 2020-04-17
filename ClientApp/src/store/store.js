import ***REMOVED*** applyMiddleware, compose, createStore ***REMOVED*** from 'redux'
import createOidcMiddleware, ***REMOVED*** loadUser ***REMOVED*** from 'redux-oidc'
import reducer from './reducer/reducer'
import userManager from './utils/userManager'

// create the middleware with the userManager
const oidcMiddleware = createOidcMiddleware(userManager)

const loggerMiddleware = store => next => action => ***REMOVED***
  // console.log('Action type:', action.type)
  // console.log('Action payload:', action.payload)
  // console.log('State before:', store.getState())
  next(action)
  // console.log('State after:', store.getState())
  // console.log('---')
***REMOVED***

const initialState = ***REMOVED******REMOVED***

const createStoreWithMiddleware = compose(
  applyMiddleware(oidcMiddleware, loggerMiddleware)
)(createStore)

const store = createStoreWithMiddleware(reducer, initialState)
loadUser(store, userManager)

export default store
