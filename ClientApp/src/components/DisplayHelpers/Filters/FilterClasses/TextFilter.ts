import ***REMOVED*** FilterType, IFilter ***REMOVED*** from './FilterTypes'
// import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../../types/FixTypeLater'

const OR_OPERATOR = '|'

export default class TextFilter implements IFilter ***REMOVED***
  _type = FilterType.String
  _fieldName: string
  _values: string[]

  constructor(fieldName: string, values?: string[]) ***REMOVED***
    this._fieldName = fieldName
    this._values = values || []
***REMOVED***

  get type(): FilterType ***REMOVED***
    return this._type
***REMOVED***

  get fieldName(): string ***REMOVED***
    return this._fieldName
***REMOVED***

  set values(newValues: string[]) ***REMOVED***
    this._values = newValues
***REMOVED***

  reset(): void ***REMOVED***
    this._values = []
***REMOVED***

  get isSet(): boolean ***REMOVED***
    return this._values.length >= 1
***REMOVED***

  get mustReplace(): boolean ***REMOVED***
    return false
***REMOVED***

  encode(): string ***REMOVED***
    if (!this.isSet) ***REMOVED***
      console.warn(`TextFilter for $***REMOVED***this._fieldName***REMOVED***: value is 0-length`)
      return ''
  ***REMOVED***
    return `$***REMOVED***this._fieldName***REMOVED***@=$***REMOVED***this._values.join(OR_OPERATOR)***REMOVED***`
***REMOVED***

  decode(inputs: string[]): TextFilter ***REMOVED***
    const values: string[] = []
    const fieldName = inputs[0].split('@=')[0]
    inputs.forEach(input => ***REMOVED***
      const valueString = input.split('@=')[1]
      if (!fieldName || !valueString) ***REMOVED***
        throw new Error(`TextFilter: Could not parse input '$***REMOVED***input***REMOVED***'`)
    ***REMOVED***
      valueString.split(OR_OPERATOR).forEach(v => values.push(v))
  ***REMOVED***)
    return new TextFilter(fieldName, values)
***REMOVED***

  clone(): TextFilter ***REMOVED***
    return new TextFilter(this._fieldName, this._values)
***REMOVED***

  get displayString(): string ***REMOVED***
    return this._values.join(' or ')
***REMOVED***
***REMOVED***
