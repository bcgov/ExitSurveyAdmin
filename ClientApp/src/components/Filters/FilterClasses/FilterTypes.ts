export enum FilterType ***REMOVED***
  String = 'string',
  Date = 'date',
  Enum = 'enum',
  Custom = 'custom',
***REMOVED***

export interface Filter ***REMOVED***
  fieldName: string
  type: FilterType
  reset: () => void
  encode: () => string
  decode: (input: string[]) => Filter
  clone: () => Filter
  displayString: string
  isSet: boolean
  mustReplace: boolean
***REMOVED***

export interface Sort ***REMOVED***
  id: string
  desc: boolean
***REMOVED***
