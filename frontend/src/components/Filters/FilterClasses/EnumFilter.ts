/* eslint-disable @typescript-eslint/no-non-null-assertion */

import ***REMOVED*** FilterType, Filter ***REMOVED*** from './FilterTypes'
import ***REMOVED*** optionsFor ***REMOVED*** from '../../../helpers/labelHelper'

const OR_OPERATOR = '|'

export default class EnumFilter implements Filter ***REMOVED***
  _type = FilterType.Enum
  _fieldName: string
  _enumKeys: string[]
  _apiUrl?: string

  constructor(fieldName: string, enumKeys?: string[], apiUrl?: string) ***REMOVED***
    this._fieldName = fieldName
    this._enumKeys = enumKeys || []
    this._apiUrl = apiUrl
***REMOVED***

  get type(): FilterType ***REMOVED***
    return this._type
***REMOVED***

  get fieldName(): string ***REMOVED***
    return this._fieldName
***REMOVED***

  set enumKeys(newEnumKeys: string[]) ***REMOVED***
    this._enumKeys = newEnumKeys
***REMOVED***

  addKey(key: string): void ***REMOVED***
    this._enumKeys.push(key)
***REMOVED***

  removeKey(key: string): void ***REMOVED***
    this._enumKeys = this._enumKeys.filter((e) => e !== key)
***REMOVED***

  reset(): void ***REMOVED***
    this._enumKeys = []
***REMOVED***

  get isSet(): boolean ***REMOVED***
    return this._enumKeys.length >= 1
***REMOVED***

  get mustReplace(): boolean ***REMOVED***
    return false
***REMOVED***

  get apiUrl(): string | undefined ***REMOVED***
    return this._apiUrl
***REMOVED***

  encode(): string ***REMOVED***
    if (!this.isSet) ***REMOVED***
      console.warn(`EnumFilter for $***REMOVED***this._fieldName***REMOVED***: value is 0-length`)
      return ''
  ***REMOVED***
    const encodedFilter = `$***REMOVED***this._fieldName***REMOVED***==$***REMOVED***this._enumKeys
      .join(OR_OPERATOR)
      .replaceAll('<', ':lt:')
      .replaceAll('>', ':gt:')***REMOVED***`
    return encodedFilter
***REMOVED***

  decode(inputs: string[]): EnumFilter ***REMOVED***
    const values: string[] = []
    const fieldName = inputs[0].split('==')[0]
    inputs.forEach((input) => ***REMOVED***
      const valueString = input.split('==')[1]
      if (!fieldName || !values) ***REMOVED***
        throw new Error(`EnumFilter: Could not parse input '$***REMOVED***input***REMOVED***'`)
    ***REMOVED***
      valueString
        .replaceAll(':lt:', '<')
        .replaceAll(':gt:', '>')
        .split(OR_OPERATOR)
        .forEach((v) => values.push(v))
  ***REMOVED***)
    return new EnumFilter(fieldName, values)
***REMOVED***

  clone(): EnumFilter ***REMOVED***
    return new EnumFilter(this._fieldName, this._enumKeys)
***REMOVED***

  get displayString(): string ***REMOVED***
    let keyNames = this._enumKeys

    const predefinedOptions = optionsFor(this._fieldName)

    // If there are predefined options, try mapping them to their names;
    // otherwise, we will just use the key names
    if (predefinedOptions && predefinedOptions.length) ***REMOVED***
      keyNames = keyNames
        .map((v) => predefinedOptions.find((opt) => opt.value === v)!.name)
        .filter((v) => v && v.length > 0)
  ***REMOVED***

    return keyNames.join(' or ')
***REMOVED***
***REMOVED***
