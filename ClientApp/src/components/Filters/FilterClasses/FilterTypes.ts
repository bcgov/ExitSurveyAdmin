export enum FilterType {
  String = 'string',
  Date = 'date',
  Enum = 'enum',
  Custom = 'custom'
}

export interface IFilter {
  fieldName: string
  type: FilterType
  reset: () => void
  encode: () => string
  decode: (input: string[]) => IFilter
  clone: () => IFilter
  displayString: string
  isSet: boolean
  mustReplace: boolean
}

export interface ISort {
  id: string
  desc: boolean
}
