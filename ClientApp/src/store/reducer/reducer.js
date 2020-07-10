import ***REMOVED*** combineReducers ***REMOVED*** from 'redux'
import ***REMOVED*** reducer as oidcReducer ***REMOVED*** from 'redux-oidc'
import errorReducer from './errorReducer'
// import storage from 'redux-persist/lib/storage'
// import ***REMOVED*** persistReducer ***REMOVED*** from 'redux-persist'

// const persistConfig = ***REMOVED***
// key: 'ExitSurveyAdmin',
// storage
// ***REMOVED***

const reducer = combineReducers(***REMOVED***
  oidc: oidcReducer,
  error: errorReducer
***REMOVED***)

// export default persistReducer(persistConfig, reducer)
export default reducer
