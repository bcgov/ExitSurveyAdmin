import ***REMOVED*** NullableString ***REMOVED*** from '../types/NullableString'
import moment from 'moment'

export function createDateAsUTCFromString(dateString: string): Date ***REMOVED***
  return moment.utc(dateString).toDate()
***REMOVED***

export function undefinedIfNull<T>(obj: T | null): T | undefined ***REMOVED***
  return obj === null ? undefined : obj
***REMOVED***

export function nullIfUndefined<T>(obj: T | undefined): T | null ***REMOVED***
  return obj === undefined ? null : obj
***REMOVED***

export function emptyStringIfNull<T>(obj: T | null): T | string ***REMOVED***
  return obj === null ? '' : obj
***REMOVED***

export function dateOrUndefined(dateString: NullableString): Date | undefined ***REMOVED***
  return dateString ? createDateAsUTCFromString(dateString) : undefined
***REMOVED***
