import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

import ***REMOVED*** NullableString ***REMOVED*** from '../types/NullableString'
export type NullableDate = Date | null
export const defaultDateFormat = 'YYYY-MM-DD'
export const defaultNiceDateFormat = 'dddd, MMMM D, yyyy'
export const defaultDatetimeFormat = 'YYYY-MM-DD HH:mm:ss z'
export const defaultNiceDatetimeFormat = 'ddd MMM D YYYY HH:mm:ss'

export const stringToDate = (str: string | undefined): Date | undefined => ***REMOVED***
  if (str === undefined) return undefined
  const candidateDate = dayjs(str)
  return candidateDate.isValid() ? candidateDate.toDate() : undefined
***REMOVED***

export const dateToString = (date: Date | undefined): string => ***REMOVED***
  return date ? dayjs(date).format(defaultDateFormat) : ''
***REMOVED***

export function createDateAsUTCFromString(dateString: string): Date ***REMOVED***
  // Use UTC plugin for UTC conversion
  return dayjs(dateString).utc().toDate()
***REMOVED***

export function createDateFromString(dateString: string): Date ***REMOVED***
  // Use local time (default)
  return dayjs(dateString).toDate()
***REMOVED***

export function dateOrUndefined(
  dateString: NullableString,
  asUTC?: boolean,
  tz?: string
): Date | undefined ***REMOVED***
  if (!dateString) return undefined
  if (tz) ***REMOVED***
    // If a timezone is provided, use it
    return dayjs.tz(dateString, tz).toDate()
***REMOVED***
  if (asUTC) ***REMOVED***
    return createDateAsUTCFromString(dateString)
***REMOVED*** else ***REMOVED***
    return createDateFromString(dateString)
***REMOVED***
***REMOVED***
