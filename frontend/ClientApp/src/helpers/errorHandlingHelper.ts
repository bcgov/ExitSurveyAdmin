import ***REMOVED*** FixTypeLater ***REMOVED*** from '../types/FixTypeLater'

const ERRORS: ***REMOVED*** [key: string]: ***REMOVED*** title: string ***REMOVED*** ***REMOVED*** = ***REMOVED***
  EMPLOYEE_NOT_FOUND: ***REMOVED***
    title: 'Employee with this ID not found',
***REMOVED***
***REMOVED***

export const setError = (dispatch: FixTypeLater, code: string): void => ***REMOVED***
  const error: FixTypeLater = ***REMOVED*** code ***REMOVED***
  error.title = ERRORS[code] ? ERRORS[code].title : 'Unknown error'
  dispatch(***REMOVED*** type: 'SET_ERROR', error ***REMOVED***)
***REMOVED***
