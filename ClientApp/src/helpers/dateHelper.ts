import moment from 'moment'

import { NullableString } from '../types/NullableString'
export type NullableDate = Date | null
export const defaultDateFormat = 'YYYY-MM-DD'
export const defaultNiceDateFormat = 'dddd, MMMM D, yyyy'
export const defaultDatetimeFormat = 'YYYY-MM-DD HH:mm:ss z'
export const defaultNiceDatetimeFormat = 'ddd MMM D YYYY HH:mm:ss'

export const stringToDate = (str: string | undefined): Date | undefined => {
  if (str === undefined) return undefined
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : undefined
}

export const dateToString = (date: Date | undefined): string => {
  return date ? moment(date).format(defaultDateFormat) : ''
}

export function createDateAsUTCFromString(dateString: string): Date {
  return moment.utc(dateString).toDate()
}

export function createDateFromString(dateString: string): Date {
  return moment(dateString).toDate()
}

export function dateOrUndefined(
  dateString: NullableString,
  asUTC?: boolean
): Date | undefined {
  if (asUTC) {
    return dateString ? createDateAsUTCFromString(dateString) : undefined
  } else {
    return dateString ? createDateFromString(dateString) : undefined
  }
}
