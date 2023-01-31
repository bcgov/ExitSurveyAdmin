import ***REMOVED*** combineReducers ***REMOVED*** from 'redux'
import ***REMOVED*** reducer as oidcReducer ***REMOVED*** from 'redux-oidc'
import errorReducer from './errorReducer'

const reducer = combineReducers(***REMOVED***
  oidc: oidcReducer,
  error: errorReducer
***REMOVED***)

export default reducer
