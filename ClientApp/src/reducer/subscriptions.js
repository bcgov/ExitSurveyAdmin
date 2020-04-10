import ***REMOVED*** LOAD_SUBSCRIPTIONS_SUCCESS ***REMOVED*** from '../actions'
import ***REMOVED*** SESSION_TERMINATED, USER_EXPIRED ***REMOVED*** from 'redux-oidc'

const initialState = ***REMOVED***
  channels: []
***REMOVED***

export default function reducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign(***REMOVED******REMOVED***, state, ***REMOVED*** channels: [] ***REMOVED***)
    case LOAD_SUBSCRIPTIONS_SUCCESS:
      return Object.assign(***REMOVED******REMOVED***, state, ***REMOVED*** channels: action.payload ***REMOVED***)
    default:
      return state
***REMOVED***
***REMOVED***
