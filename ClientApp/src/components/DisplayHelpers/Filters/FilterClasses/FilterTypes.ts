export enum FilterType ***REMOVED***
  String = 'string',
  Date = 'date',
  Enum = 'enum'
***REMOVED***

export interface IFilter ***REMOVED***
  fieldName: string
  type: FilterType
  reset: () => void
  encode: () => string
  decode: (input: string[]) => ThisType<this>
  clone: () => ThisType<this>
  displayString: string
  isSet: boolean
  mustReplace: boolean
***REMOVED***

export interface ISort ***REMOVED***
  id: string
  desc: boolean
***REMOVED***
