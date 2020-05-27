import moment from 'moment'

export type NullableDate = Date | null
export const defaultFormat = 'YYYY-MM-DD'

export const stringToDate = (str: string): NullableDate => {
  const candidateDate = moment(str)
  return candidateDate.isValid() ? candidateDate.toDate() : null
}
export const dateToString = (date: NullableDate): string => {
  return date ? moment(date).format(defaultFormat) : ''
}
