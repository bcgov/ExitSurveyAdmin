import { FilterType, IFilter } from './FilterTypes'
// import { FixTypeLater } from '../../../types/FixTypeLater'

export default class TextFilter implements IFilter {
  _type = FilterType.String
  _fieldName: string
  _value: string

  constructor(fieldName: string, value?: string) {
    this._fieldName = fieldName
    this._value = value || ''
  }

  get type(): FilterType {
    return this._type
  }

  get fieldName(): string {
    return this._fieldName
  }

  set value(newValue: string) {
    this._value = newValue
  }

  reset(): void {
    this.value = ''
  }

  get isSet(): boolean {
    return this._value.length >= 1
  }

  encode(): string {
    if (!this.isSet) {
      console.warn(`TextFilter for ${this._fieldName}: value is 0-length`)
      return ''
    }
    return `${this._fieldName}@=${this._value}`
  }

  decode(input: string[]): TextFilter {
    // This takes multiple values, but will only use the first one.
    const [fieldName, value] = input[0].split('@=')
    if (!fieldName || !value) {
      throw new Error(`TextFilter: Could not parse input '${input}'`)
    }
    return new TextFilter(fieldName, value)
  }

  clone(): TextFilter {
    return new TextFilter(this._fieldName, this._value)
  }

  get displayString(): string {
    return this._value
  }
}
