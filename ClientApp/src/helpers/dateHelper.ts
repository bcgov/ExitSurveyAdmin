import moment from 'moment'

export type NullableDate = Date | null
export const defaultFormat = 'YYYY-MM-DD'

export const stringToDate = (str: string | undefined): Date | undefined => ***REMOVED***
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : undefined
***REMOVED***
export const dateToString = (date: Date | undefined): string => ***REMOVED***
  return date ? moment(date).format(defaultFormat) : ''
***REMOVED***
