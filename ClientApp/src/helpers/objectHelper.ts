import ***REMOVED*** NullableString ***REMOVED*** from '../types/NullableString'

export function undefinedIfNull<T>(obj: T | null): T | undefined ***REMOVED***
  return obj === null ? undefined : obj
***REMOVED***

export function emptyStringIfNull<T>(obj: T | null): T | string ***REMOVED***
  return obj === null ? '' : obj
***REMOVED***

export function dateOrUndefined(dateString: NullableString): Date | undefined ***REMOVED***
  return dateString ? new Date(dateString) : undefined
***REMOVED***
