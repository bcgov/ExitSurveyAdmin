export enum FilterType {
  String = 'string',
  Date = 'date',
  Enum = 'enum'
}

export interface IFilter {
  fieldName: string
  type: FilterType
  reset: () => void
  encode: () => string
  decode: (input: string[]) => ThisType<this>
  clone: () => ThisType<this>
  displayString: string
  isSet: boolean
  mustReplace: boolean
}

export interface ISort {
  id: string
  desc: boolean
}
