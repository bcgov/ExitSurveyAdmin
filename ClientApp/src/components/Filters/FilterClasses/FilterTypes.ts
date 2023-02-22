export enum FilterType ***REMOVED***
  String = 'string',
  Date = 'date',
  Enum = 'enum',
  Custom = 'custom'
***REMOVED***

export interface IFilter ***REMOVED***
  fieldName: string
  type: FilterType
  reset: () => void
  encode: () => string
  decode: (input: string[]) => IFilter
  clone: () => IFilter
  displayString: string
  isSet: boolean
  mustReplace: boolean
***REMOVED***

export interface ISort ***REMOVED***
  id: string
  desc: boolean
***REMOVED***
