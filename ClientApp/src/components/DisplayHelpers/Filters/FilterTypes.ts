export type StringFilter = 'string'
export type DateFilter = 'date'
export type FilterType = StringFilter | DateFilter

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
  { fieldName: 'firstName', type: 'string', values: [] },
  { fieldName: 'lastName', type: 'string', values: [] },
  { fieldName: 'telkey', type: 'string', values: [] },
  { fieldName: 'governmentEmployeeId', type: 'string', values: [] },
  { fieldName: 'classification', type: 'string', values: [] },
  { fieldName: 'effectiveDate', type: 'date', values: [] }
]
