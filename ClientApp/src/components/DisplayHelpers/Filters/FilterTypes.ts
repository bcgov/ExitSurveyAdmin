export type StringFilter = 'string'
export type DateFilter = 'date'
export type EnumFilter = 'enum'
export type FilterType = StringFilter | DateFilter | EnumFilter

export interface IFilterField {
  fieldName: string
  type: FilterType
  values: string[]
}

export abstract class FilterHandler {
  abstract encode(filterField: IFilterField): string
  abstract decode(input: string[]): IFilterField
}

export interface ISort {
  id: string
  desc: boolean
}

export const employeeFilterFields: IFilterField[] = [
  { fieldName: 'telkey', type: 'string', values: [] },
  { fieldName: 'governmentEmployeeId', type: 'string', values: [] },
  { fieldName: 'firstName', type: 'string', values: [] },
  { fieldName: 'lastName', type: 'string', values: [] },
  { fieldName: 'governmentEmail', type: 'string', values: [] },
  { fieldName: 'classification', type: 'string', values: [] },
  { fieldName: 'effectiveDate', type: 'date', values: ['', ''] },
  { fieldName: 'currentEmployeeStatusCode', type: 'enum', values: [] },
  { fieldName: 'reason', type: 'enum', values: [] }
]
