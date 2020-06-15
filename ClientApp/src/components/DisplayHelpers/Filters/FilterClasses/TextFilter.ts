import ***REMOVED*** FilterType, IFilter ***REMOVED*** from './FilterTypes'
// import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'

export default class TextFilter implements IFilter ***REMOVED***
  _type = FilterType.String
  _fieldName: string
  _value: string

  constructor(fieldName: string, value?: string) ***REMOVED***
    this._fieldName = fieldName
    this._value = value || ''
***REMOVED***

  get type(): FilterType ***REMOVED***
    return this._type
***REMOVED***

  get fieldName(): string ***REMOVED***
    return this._fieldName
***REMOVED***

  set value(newValue: string) ***REMOVED***
    this._value = newValue
***REMOVED***

  reset(): void ***REMOVED***
    this.value = ''
***REMOVED***

  get isSet(): boolean ***REMOVED***
    return this._value.length >= 1
***REMOVED***

  encode(): string ***REMOVED***
    if (!this.isSet) ***REMOVED***
      console.warn(`TextFilter for $***REMOVED***this._fieldName***REMOVED***: value is 0-length`)
      return ''
  ***REMOVED***
    return `$***REMOVED***this._fieldName***REMOVED***@=$***REMOVED***this._value***REMOVED***`
***REMOVED***

  decode(input: string[]): TextFilter ***REMOVED***
    // This takes multiple values, but will only use the first one.
    const [fieldName, value] = input[0].split('@=')
    if (!fieldName || !value) ***REMOVED***
      throw new Error(`TextFilter: Could not parse input '$***REMOVED***input***REMOVED***'`)
  ***REMOVED***
    return new TextFilter(fieldName, value)
***REMOVED***

  clone(): TextFilter ***REMOVED***
    return new TextFilter(this._fieldName, this._value)
***REMOVED***

  get displayString(): string ***REMOVED***
    return this._value
***REMOVED***
***REMOVED***
