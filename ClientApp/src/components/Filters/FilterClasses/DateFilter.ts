import { dateToString, stringToDate } from '../../../helpers/dateHelper'
import { FilterType, IFilter } from './FilterTypes'

const GTE_OPERATOR = '>='
const LTE_OPERATOR = '<='

export default class DateFilter implements IFilter {
  _type = FilterType.Date
  _fieldName: string
  _from?: Date
  _to?: Date

  constructor(fieldName: string, from?: Date, to?: Date) {
    this._fieldName = fieldName
    this._from = from
    this._to = to
  }

  get type(): FilterType {
    return this._type
  }

  get fieldName(): string {
    return this._fieldName
  }

  set from(newFrom: Date | undefined) {
    this._from = newFrom
  }

  set to(newTo: Date | undefined) {
    this._to = newTo
  }

  reset(): void {
    this._from = undefined
    this._to = undefined
  }

  get isSet(): boolean {
    return !(this._from === undefined && this._to === undefined)
  }

  get mustReplace(): boolean {
    return true
  }

  encode(): string {
    if (!this.isSet) {
      console.warn(`DateFilter for ${this._fieldName}: from and to both undef.`)
      return ''
    }

    // Check for falsiness, and only include in the filter if not falsy
    const fromDateFilter = this._from
      ? `${this._fieldName}${GTE_OPERATOR}${dateToString(this._from)}`
      : null
    const toDateFilter = this._to
      ? `${this._fieldName}${LTE_OPERATOR}${dateToString(this._to)}`
      : null

    const dateFilterArray = [fromDateFilter, toDateFilter]
    return dateFilterArray.filter(s => s !== null).join(',')
  }

  // This could take one or two strings, e.g.
  // ['someDate>=2019-01-01','someDate<=2019-12-31']
  decode(input: string[]): DateFilter {
    let fieldName = ''
    let from = undefined
    let to = undefined

    input.forEach(inputString => {
      if (inputString.indexOf(GTE_OPERATOR) > 0) {
        ;[fieldName, from] = inputString.split(GTE_OPERATOR)
      } else if (inputString.indexOf(LTE_OPERATOR) > 0) {
        ;[fieldName, to] = inputString.split(LTE_OPERATOR)
      }
    })

    if (!fieldName) {
      throw new Error(`DateFilter: Could not parse input '${input}'`)
    }
    return new DateFilter(fieldName, stringToDate(from), stringToDate(to))
  }

  clone(): DateFilter {
    return new DateFilter(this._fieldName, this._from, this._to)
  }

  get displayString(): string {
    const fromString = dateToString(this._from)
    const toString = dateToString(this._to)

    if (fromString && toString) {
      return `${fromString} to ${toString}`
    } else if (fromString) {
      return `From ${fromString}`
    } else if (toString) {
      return `Before ${toString}`
    } else {
      return ''
    }
  }
}
