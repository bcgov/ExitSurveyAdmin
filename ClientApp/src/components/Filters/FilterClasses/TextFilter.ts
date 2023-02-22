import ***REMOVED*** FilterType, IFilter ***REMOVED*** from './FilterTypes'

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
    // Special case where all values are blank; this is how we search for empty
    // items, per https://github.com/Biarity/Sieve/issues/50
    if (this._values.every((v: string) => v.length === 0)) ***REMOVED***
      return `$***REMOVED***this._fieldName***REMOVED***==$***REMOVED***OR_OPERATOR***REMOVED***`
  ***REMOVED***
    return `$***REMOVED***this._fieldName***REMOVED***@=$***REMOVED***this._values.join(OR_OPERATOR)***REMOVED***`
***REMOVED***

  decode(inputs: string[]): TextFilter ***REMOVED***
    const values: string[] = []
    let fieldName = inputs[0].split('@=')[0]
    for (const input of inputs) ***REMOVED***
      let valueString = input.split('@=')[1]
      if (!fieldName || !valueString) ***REMOVED***
        // This might be the special case from above; try splitting on the ==
        ;[fieldName, valueString] = input.split('==')
        if (valueString) ***REMOVED***
          return new TextFilter(fieldName, ['', ''])
      ***REMOVED*** else ***REMOVED***
          // If still no valueString, throw an error
          throw new Error(`TextFilter: Could not parse input '$***REMOVED***input***REMOVED***'`)
      ***REMOVED***
    ***REMOVED***
      valueString.split(OR_OPERATOR).forEach(v => values.push(v))
  ***REMOVED***
    return new TextFilter(fieldName, values)
***REMOVED***

  clone(): TextFilter ***REMOVED***
    const clone = new TextFilter(this._fieldName, this._values)
    return clone
***REMOVED***

  get displayString(): string ***REMOVED***
    // Special case for all blanks
    if (this._values.every(v => v.length === 0)) ***REMOVED***
      return 'is blank'
  ***REMOVED*** else ***REMOVED***
      return this._values.join(' or ')
  ***REMOVED***
***REMOVED***
***REMOVED***
