import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

import { NullableString } from '../types/NullableString'
export type NullableDate = Date | null
export const defaultDateFormat = 'YYYY-MM-DD'
export const defaultNiceDateFormat = 'dddd, MMMM D, yyyy'
export const defaultDatetimeFormat = 'YYYY-MM-DD HH:mm:ss z'
export const defaultNiceDatetimeFormat = 'ddd MMM D YYYY HH:mm:ss'

export const stringToDate = (str: string | undefined): Date | undefined => {
  if (str === undefined) return undefined
  const candidateDate = dayjs(str)
  return candidateDate.isValid() ? candidateDate.toDate() : undefined
}

export const dateToString = (date: Date | undefined): string => {
  return date ? dayjs(date).format(defaultDateFormat) : ''
}

export function createDateAsUTCFromString(dateString: string): Date {
  // Use UTC plugin for UTC conversion
  return dayjs(dateString).utc().toDate()
}

export function createDateFromString(dateString: string): Date {
  // Use local time (default)
  return dayjs(dateString).toDate()
}

export function dateOrUndefined(
  dateString: NullableString,
  asUTC?: boolean,
  tz?: string
): Date | undefined {
  if (!dateString) return undefined
  if (tz) {
    // If a timezone is provided, use it
    return dayjs.tz(dateString, tz).toDate()
  }
  if (asUTC) {
    return createDateAsUTCFromString(dateString)
  } else {
    return createDateFromString(dateString)
  }
}
