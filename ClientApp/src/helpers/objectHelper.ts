import ***REMOVED*** NullableString ***REMOVED*** from '../types/NullableString'

// Dates coming over the wire are UTC, but by default this is not understood
// when creating dates.From https://stackoverflow.com/a/14006555.
export function createDateAsUTCFromString(dateString: string): Date ***REMOVED***
  const date = new Date(dateString)
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  )
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
