const initialState = ***REMOVED***
  error: null
***REMOVED***

export default function reducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case 'SET_ERROR': ***REMOVED***
      return Object.assign(***REMOVED******REMOVED***, state, ***REMOVED*** error: action.error ***REMOVED***)
  ***REMOVED***
    case 'CLEAR_ERROR': ***REMOVED***
      return Object.assign(***REMOVED******REMOVED***, state, ***REMOVED*** error: null ***REMOVED***)
  ***REMOVED***
    default:
      return state
***REMOVED***
***REMOVED***
