/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { FilterType, Filter } from './FilterTypes'
import { optionsFor } from '../../../helpers/labelHelper'

const OR_OPERATOR = '|'

export default class EnumFilter implements Filter {
  _type = FilterType.Enum
  _fieldName: string
  _enumKeys: string[]
  _apiUrl?: string

  constructor(fieldName: string, enumKeys?: string[], apiUrl?: string) {
    this._fieldName = fieldName
    this._enumKeys = enumKeys || []
    this._apiUrl = apiUrl
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
    this._enumKeys = this._enumKeys.filter((e) => e !== key)
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

  get apiUrl(): string | undefined {
    return this._apiUrl
  }

  encode(): string {
    if (!this.isSet) {
      console.warn(`EnumFilter for ${this._fieldName}: value is 0-length`)
      return ''
    }
    const encodedFilter = `${this._fieldName}==${this._enumKeys
      .join(OR_OPERATOR)
      .replaceAll('<', ':lt:')
      .replaceAll('>', ':gt:')}`
    return encodedFilter
  }

  decode(inputs: string[]): EnumFilter {
    const values: string[] = []
    const fieldName = inputs[0].split('==')[0]
    inputs.forEach((input) => {
      const valueString = input.split('==')[1]
      if (!fieldName || !values) {
        throw new Error(`EnumFilter: Could not parse input '${input}'`)
      }
      valueString
        .replaceAll(':lt:', '<')
        .replaceAll(':gt:', '>')
        .split(OR_OPERATOR)
        .forEach((v) => values.push(v))
    })
    return new EnumFilter(fieldName, values)
  }

  clone(): EnumFilter {
    return new EnumFilter(this._fieldName, this._enumKeys)
  }

  get displayString(): string {
    let keyNames = this._enumKeys

    const predefinedOptions = optionsFor(this._fieldName)

    // If there are predefined options, try mapping them to their names;
    // otherwise, we will just use the key names
    if (predefinedOptions && predefinedOptions.length) {
      keyNames = keyNames
        .map((v) => predefinedOptions.find((opt) => opt.value === v)!.name)
        .filter((v) => v && v.length > 0)
    }

    return keyNames.join(' or ')
  }
}
