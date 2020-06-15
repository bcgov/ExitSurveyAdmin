import ***REMOVED*** FilterType, IFilter ***REMOVED*** from './FilterTypes'

const OR_OPERATOR = '|'

export default class EnumFilter implements IFilter ***REMOVED***
  _type = FilterType.Enum
  _fieldName: string
  _enumKeys: string[]

  constructor(fieldName: string, enumKeys?: string[]) ***REMOVED***
    this._fieldName = fieldName
    this._enumKeys = enumKeys || []
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
    this._enumKeys = this._enumKeys.filter(e => e !== key)
***REMOVED***

  reset(): void ***REMOVED***
    this._enumKeys = []
***REMOVED***

  get isSet(): boolean ***REMOVED***
    return this._enumKeys.length >= 1
***REMOVED***

  encode(): string ***REMOVED***
    if (!this.isSet) ***REMOVED***
      console.warn(`EnumFilter for $***REMOVED***this._fieldName***REMOVED***: value is 0-length`)
      return ''
  ***REMOVED***
    return `$***REMOVED***this._fieldName***REMOVED***@=$***REMOVED***this._enumKeys***REMOVED***`
***REMOVED***

  decode(input: string[]): EnumFilter ***REMOVED***
    // This takes multiple values, but will only use the first one.
    const [fieldName, values] = input[0].split('@=')
    if (!fieldName || !values) ***REMOVED***
      throw new Error(`EnumFilter: Could not parse input '$***REMOVED***input***REMOVED***'`)
  ***REMOVED***

    return new EnumFilter(fieldName, values.split(OR_OPERATOR))
***REMOVED***

  clone(): EnumFilter ***REMOVED***
    return new EnumFilter(this._fieldName, this._enumKeys)
***REMOVED***

  get displayString(): string ***REMOVED***
    // valueString = values
    // .map(
    //   v =>
    //     enumItemsForField(fieldName).find(enumItem => enumItem.value === v)!
    //       .name
    // )
    // .filter(v => v && v.length > 0)
    // .join(' or ')
    return this._enumKeys.join(', ')
***REMOVED***
***REMOVED***
