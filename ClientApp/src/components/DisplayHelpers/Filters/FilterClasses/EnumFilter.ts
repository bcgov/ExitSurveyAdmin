import { FilterType, IFilter } from './FilterTypes'

const OR_OPERATOR = '|'

export default class EnumFilter implements IFilter {
  _type = FilterType.Enum
  _fieldName: string
  _enumKeys: string[]

  constructor(fieldName: string, enumKeys?: string[]) {
    this._fieldName = fieldName
    this._enumKeys = enumKeys || []
  }

  get type(): FilterType {
    return this._type
  }

  get fieldName(): string {
    return this._fieldName
  }

  set enumKeys(newEnumKeys: string[]) {
    this._enumKeys = newEnumKeys
  }

  addKey(key: string): void {
    this._enumKeys.push(key)
  }

  removeKey(key: string): void {
    this._enumKeys = this._enumKeys.filter(e => e !== key)
  }

  reset(): void {
    this._enumKeys = []
  }

  get isSet(): boolean {
    return this._enumKeys.length >= 1
  }

  encode(): string {
    if (!this.isSet) {
      console.warn(`EnumFilter for ${this._fieldName}: value is 0-length`)
      return ''
    }
    return `${this._fieldName}@=${this._enumKeys}`
  }

  decode(input: string[]): EnumFilter {
    // This takes multiple values, but will only use the first one.
    const [fieldName, values] = input[0].split('@=')
    if (!fieldName || !values) {
      throw new Error(`EnumFilter: Could not parse input '${input}'`)
    }

    return new EnumFilter(fieldName, values.split(OR_OPERATOR))
  }

  clone(): EnumFilter {
    return new EnumFilter(this._fieldName, this._enumKeys)
  }

  get displayString(): string {
    // valueString = values
    // .map(
    //   v =>
    //     enumItemsForField(fieldName).find(enumItem => enumItem.value === v)!
    //       .name
    // )
    // .filter(v => v && v.length > 0)
    // .join(' or ')
    return this._enumKeys.join(', ')
  }
}
