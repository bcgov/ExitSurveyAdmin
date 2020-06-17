import moment from 'moment'

export type NullableDate = Date | null
export const defaultDateFormat = 'YYYY-MM-DD'
export const defaultNiceDateFormat = 'dddd, MMMM D, yyyy'
export const defaultDatetimeFormat = 'YYYY-MM-DD HH:mm:ss z'
export const defaultNiceDatetimeFormat = 'ddd MMM D YYYY HH:mm:ss' //'ddd MMM D y @ hh:mm:ss'

export const stringToDate = (str: string | undefined): Date | undefined => {
  if (str === undefined) return undefined
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : undefined
}
export const dateToString = (date: Date | undefined): string => {
  return date ? moment(date).format(defaultDateFormat) : ''
}
