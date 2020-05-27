import moment from 'moment'

export type NullableDate = Date | null
export const defaultFormat = 'YYYY-MM-DD'

export const stringToDate = (str: string): NullableDate => ***REMOVED***
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : null
***REMOVED***
export const dateToString = (date: NullableDate): string => ***REMOVED***
  return date ? moment(date).format(defaultFormat) : ''
***REMOVED***
