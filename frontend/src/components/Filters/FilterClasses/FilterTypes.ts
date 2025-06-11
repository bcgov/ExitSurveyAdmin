export enum FilterType {
  String = 'string',
  Date = 'date',
  Enum = 'enum',
  Custom = 'custom',
}

export interface Filter {
  fieldName: string
  type: FilterType
  reset: () => void
  encode: () => string
  decode: (input: string[]) => Filter
  clone: () => Filter
  displayString: string
  isSet: boolean
  mustReplace: boolean
}

export interface Sort {
  id: string
  desc: boolean
}
