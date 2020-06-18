export function undefinedIfNull<T>(obj: T | null): T | undefined ***REMOVED***
  return obj === null ? undefined : obj
***REMOVED***

export function nullIfUndefined<T>(obj: T | undefined): T | null ***REMOVED***
  return obj === undefined ? null : obj
***REMOVED***

export function emptyStringIfNull<T>(obj: T | null): T | string ***REMOVED***
  return obj === null ? '' : obj
***REMOVED***
