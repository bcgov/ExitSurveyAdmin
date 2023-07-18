import moment from 'moment-timezone'

import ***REMOVED*** NullableString ***REMOVED*** from '../types/NullableString'
export type NullableDate = Date | null
export const defaultDateFormat = 'YYYY-MM-DD'
export const defaultNiceDateFormat = 'dddd, MMMM D, yyyy'
export const defaultDatetimeFormat = 'YYYY-MM-DD HH:mm:ss z'
export const defaultNiceDatetimeFormat = 'ddd MMM D YYYY HH:mm:ss'

export const stringToDate = (str: string | undefined): Date | undefined => ***REMOVED***
  if (str === undefined) return undefined
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : undefined
***REMOVED***

export const dateToString = (date: Date | undefined): string => ***REMOVED***
  return date ? moment(date).format(defaultDateFormat) : ''
***REMOVED***

export function createDateAsUTCFromString(dateString: string): Date ***REMOVED***
  return moment.utc(dateString).toDate()
***REMOVED***

export function createDateFromString(dateString: string): Date ***REMOVED***
  return moment(dateString).toDate()
***REMOVED***

export function dateOrUndefined(
  dateString: NullableString,
  asUTC?: boolean
): Date | undefined ***REMOVED***
  if (asUTC) ***REMOVED***
    return dateString ? createDateAsUTCFromString(dateString) : undefined
***REMOVED*** else ***REMOVED***
    return dateString ? createDateFromString(dateString) : undefined
***REMOVED***
***REMOVED***
