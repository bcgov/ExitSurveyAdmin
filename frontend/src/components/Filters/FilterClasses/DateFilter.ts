import ***REMOVED*** dateToString, stringToDate ***REMOVED*** from '../../../helpers/dateHelper'
import ***REMOVED*** FilterType, Filter ***REMOVED*** from './FilterTypes'

const GTE_OPERATOR = '>='
const LTE_OPERATOR = '<='

export default class DateFilter implements Filter ***REMOVED***
  _type = FilterType.Date
  _fieldName: string
  _from?: Date
  _to?: Date

  constructor(fieldName: string, from?: Date, to?: Date) ***REMOVED***
    this._fieldName = fieldName
    this._from = from
    this._to = to
***REMOVED***

  get type(): FilterType ***REMOVED***
    return this._type
***REMOVED***

  get fieldName(): string ***REMOVED***
    return this._fieldName
***REMOVED***

  set from(newFrom: Date | undefined) ***REMOVED***
    this._from = newFrom
***REMOVED***

  set to(newTo: Date | undefined) ***REMOVED***
    this._to = newTo
***REMOVED***

  reset(): void ***REMOVED***
    this._from = undefined
    this._to = undefined
***REMOVED***

  get isSet(): boolean ***REMOVED***
    return !(this._from === undefined && this._to === undefined)
***REMOVED***

  get mustReplace(): boolean ***REMOVED***
    return true
***REMOVED***

  encode(): string ***REMOVED***
    if (!this.isSet) ***REMOVED***
      console.warn(`DateFilter for $***REMOVED***this._fieldName***REMOVED***: from and to both undef.`)
      return ''
  ***REMOVED***

    // Check for falsiness, and only include in the filter if not falsy
    const fromDateFilter = this._from
      ? `$***REMOVED***this._fieldName***REMOVED***$***REMOVED***GTE_OPERATOR***REMOVED***$***REMOVED***dateToString(this._from)***REMOVED***`
      : null
    const toDateFilter = this._to
      ? `$***REMOVED***this._fieldName***REMOVED***$***REMOVED***LTE_OPERATOR***REMOVED***$***REMOVED***dateToString(this._to)***REMOVED***`
      : null

    const dateFilterArray = [fromDateFilter, toDateFilter]
    return dateFilterArray.filter((s) => s !== null).join(',')
***REMOVED***

  // This could take one or two strings, e.g.
  // ['someDate>=2019-01-01','someDate<=2019-12-31']
  decode(input: string[]): DateFilter ***REMOVED***
    let fieldName = ''
    let from = undefined
    let to = undefined

    input.forEach((inputString) => ***REMOVED***
      if (inputString.indexOf(GTE_OPERATOR) > 0) ***REMOVED***
        ;[fieldName, from] = inputString.split(GTE_OPERATOR)
    ***REMOVED*** else if (inputString.indexOf(LTE_OPERATOR) > 0) ***REMOVED***
        ;[fieldName, to] = inputString.split(LTE_OPERATOR)
    ***REMOVED***
  ***REMOVED***)

    if (!fieldName) ***REMOVED***
      throw new Error(`DateFilter: Could not parse input '$***REMOVED***input***REMOVED***'`)
  ***REMOVED***
    return new DateFilter(fieldName, stringToDate(from), stringToDate(to))
***REMOVED***

  clone(): DateFilter ***REMOVED***
    return new DateFilter(this._fieldName, this._from, this._to)
***REMOVED***

  get displayString(): string ***REMOVED***
    const fromString = dateToString(this._from)
    const toString = dateToString(this._to)

    if (fromString && toString) ***REMOVED***
      return `$***REMOVED***fromString***REMOVED*** to $***REMOVED***toString***REMOVED***`
  ***REMOVED*** else if (fromString) ***REMOVED***
      return `From $***REMOVED***fromString***REMOVED***`
  ***REMOVED*** else if (toString) ***REMOVED***
      return `Before $***REMOVED***toString***REMOVED***`
  ***REMOVED*** else ***REMOVED***
      return ''
  ***REMOVED***
***REMOVED***
***REMOVED***
