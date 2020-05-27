import ***REMOVED*** FilterHandler, IFilterField ***REMOVED*** from './FilterTypes'
// import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'

const GTE_OPERATOR = '>='
const LTE_OPERATOR = '<='

export default class DateFilterHandler extends FilterHandler ***REMOVED***
  static _instance: DateFilterHandler

  encode(filterField: IFilterField): string ***REMOVED***
    if (!filterField.values || filterField.values.length !== 2) ***REMOVED***
      console.warn('DateFilter: filterField.values is falsy or length != 2')
      return ''
  ***REMOVED***
    const fieldName = filterField.fieldName
    // By convention, the first item is the "from" date, and the second item is
    // the "to" date. TODO: Could refactor this.
    const [fromDate, toDate] = filterField.values

    // Check for falsiness, and only include in the filter if not falsy
    const fromDateFilter =
      fromDate && fromDate.length > 0
        ? `$***REMOVED***fieldName***REMOVED***$***REMOVED***GTE_OPERATOR***REMOVED***$***REMOVED***fromDate***REMOVED***`
        : null
    const toDateFilter =
      toDate && toDate.length > 0
        ? `$***REMOVED***fieldName***REMOVED***$***REMOVED***LTE_OPERATOR***REMOVED***$***REMOVED***toDate***REMOVED***`
        : null

    return [fromDateFilter, toDateFilter].filter(s => s !== null).join(',')
***REMOVED***

  decode(input: string[]): IFilterField ***REMOVED***
    // This could take one or two strings.
    let column = ''
    let fromValue = ''
    let toValue = ''

    input.forEach(inputString => ***REMOVED***
      if (inputString.indexOf(GTE_OPERATOR) > 0) ***REMOVED***
        ;[column, fromValue] = inputString.split(GTE_OPERATOR)
    ***REMOVED*** else if (inputString.indexOf(LTE_OPERATOR) > 0) ***REMOVED***
        ;[column, toValue] = inputString.split(LTE_OPERATOR)
    ***REMOVED***
  ***REMOVED***)

    if (!column) ***REMOVED***
      throw new Error(`DateFilter: Could not parse input '$***REMOVED***input***REMOVED***'`)
  ***REMOVED***
    return ***REMOVED***
      fieldName: column,
      type: 'date',
      values: [fromValue, toValue]
  ***REMOVED***
***REMOVED***

  static instance(): DateFilterHandler ***REMOVED***
    if (!this._instance) ***REMOVED***
      this._instance = new DateFilterHandler()
  ***REMOVED***
    return this._instance
***REMOVED***
***REMOVED***
