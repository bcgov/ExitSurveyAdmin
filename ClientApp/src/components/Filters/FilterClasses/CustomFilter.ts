/* eslint-disable @typescript-eslint/no-non-null-assertion */

import ***REMOVED*** FilterType, IFilter ***REMOVED*** from './FilterTypes'

export default class CustomFilter implements IFilter ***REMOVED***
  _type = FilterType.Custom
  _fieldName: string

  constructor(fieldName: string) ***REMOVED***
    this._fieldName = fieldName
***REMOVED***

  get type(): FilterType ***REMOVED***
    return this._type
***REMOVED***

  get fieldName(): string ***REMOVED***
    return this._fieldName
***REMOVED***

  reset(): void ***REMOVED***
    // No-op
***REMOVED***

  get isSet(): boolean ***REMOVED***
    return true
***REMOVED***

  get mustReplace(): boolean ***REMOVED***
    return true
***REMOVED***

  encode(): string ***REMOVED***
    if (!this.isSet) ***REMOVED***
      console.warn(`CustomFilter for $***REMOVED***this._fieldName***REMOVED***: value is 0-length`)
      return ''
  ***REMOVED***
    return `$***REMOVED***this._fieldName***REMOVED***`
***REMOVED***

  decode(inputs: string[]): CustomFilter ***REMOVED***
    const fieldName = inputs[0]
    return new CustomFilter(fieldName)
***REMOVED***

  clone(): CustomFilter ***REMOVED***
    return new CustomFilter(this._fieldName)
***REMOVED***

  get displayString(): string ***REMOVED***
    return 'is blank'
***REMOVED***
***REMOVED***
