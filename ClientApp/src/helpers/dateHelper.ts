import moment from 'moment'

export type NullableDate = Date | null
export const defaultFormat = 'YYYY-MM-DD'

export const stringToDate = (str: string | undefined): Date | undefined => {
  if (str === undefined) return undefined
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : undefined
}
export const dateToString = (date: Date | undefined): string => {
  return date ? moment(date).format(defaultFormat) : ''
}
