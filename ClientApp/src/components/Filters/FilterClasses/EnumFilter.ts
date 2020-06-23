/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { FilterType, IFilter } from './FilterTypes'
import { optionsFor } from '../../../helpers/labelHelper'

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

  get mustReplace(): boolean {
    return false
  }

  encode(): string {
    if (!this.isSet) {
      console.warn(`EnumFilter for ${this._fieldName}: value is 0-length`)
      return ''
    }
    return `${this._fieldName}==${this._enumKeys.join(OR_OPERATOR)}`
  }

  decode(inputs: string[]): EnumFilter {
    const values: string[] = []
    const fieldName = inputs[0].split('==')[0]
    inputs.forEach(input => {
      const valueString = input.split('==')[1]
      if (!fieldName || !values) {
        throw new Error(`EnumFilter: Could not parse input '${input}'`)
      }
      valueString.split(OR_OPERATOR).forEach(v => values.push(v))
    })
    return new EnumFilter(fieldName, values)
  }

  clone(): EnumFilter {
    return new EnumFilter(this._fieldName, this._enumKeys)
  }

  get displayString(): string {
    const valueString = this._enumKeys
      .map(v => optionsFor(this._fieldName).find(opt => opt.value === v)!.name)
      .filter(v => v && v.length > 0)
      .join(' or ')
    return valueString
  }
}
