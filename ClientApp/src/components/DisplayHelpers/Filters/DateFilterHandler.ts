import { FilterHandler, IFilterField } from './FilterTypes'
// import { FixTypeLater } from '../../../types/FixTypeLater'

const GTE_OPERATOR = '>='
const LTE_OPERATOR = '<='

export default class DateFilterHandler extends FilterHandler {
  static _instance: DateFilterHandler

  encode(filterField: IFilterField): string {
    if (!filterField.values || filterField.values.length !== 2) {
      console.warn('DateFilter: filterField.values is falsy or length != 2')
      return ''
    }
    const fieldName = filterField.fieldName
    // By convention, the first item is the "from" date, and the second item is
    // the "to" date. TODO: Could refactor this.
    const [fromDate, toDate] = filterField.values

    // Check for falsiness, and only include in the filter if not falsy
    const fromDateFilter =
      fromDate && fromDate.length > 0
        ? `${fieldName}${GTE_OPERATOR}${fromDate}`
        : null
    const toDateFilter =
      toDate && toDate.length > 0
        ? `${fieldName}${LTE_OPERATOR}${toDate}`
        : null

    return [fromDateFilter, toDateFilter].filter(s => s !== null).join(',')
  }

  decode(input: string[]): IFilterField {
    // This could take one or two strings.
    let column = ''
    let fromValue = ''
    let toValue = ''

    input.forEach(inputString => {
      if (inputString.indexOf(GTE_OPERATOR) > 0) {
        ;[column, fromValue] = inputString.split(GTE_OPERATOR)
      } else if (inputString.indexOf(LTE_OPERATOR) > 0) {
        ;[column, toValue] = inputString.split(LTE_OPERATOR)
      }
    })

    if (!column) {
      throw `DateFilter: Could not parse input '${input}'`
    }
    return {
      fieldName: column,
      type: 'date',
      values: [fromValue, toValue]
    }
  }

  static instance(): DateFilterHandler {
    if (!this._instance) {
      this._instance = new DateFilterHandler()
    }
    return this._instance
  }
}
