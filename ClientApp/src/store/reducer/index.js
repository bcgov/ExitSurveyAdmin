import ***REMOVED*** routerReducer ***REMOVED*** from 'connected-react-router'
import ***REMOVED*** combineReducers ***REMOVED*** from 'redux'
import ***REMOVED*** reducer as oidcReducer ***REMOVED*** from 'redux-oidc'
import subscriptionsReducer from './subscriptions'

const reducer = combineReducers(***REMOVED***
  routing: routerReducer,
  oidc: oidcReducer,
  subscriptions: subscriptionsReducer
***REMOVED***)

export default reducer
