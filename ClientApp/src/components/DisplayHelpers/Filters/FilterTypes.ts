import ***REMOVED*** TextFilterHandler ***REMOVED*** from './TextFilterInput'

export type StringFilter = 'string'
export type DateFilter = 'date'
export type FilterType = StringFilter | DateFilter

export interface IFilterField ***REMOVED***
  fieldName: string
  type: FilterType
  values: string[]
***REMOVED***

export abstract class FilterHandler ***REMOVED***
  abstract encode(filterField: IFilterField): string
  abstract decode(input: string): IFilterField
***REMOVED***

export class MasterFilterEncoder ***REMOVED***
  static encode(filterField: IFilterField): string ***REMOVED***
    switch (filterField.type) ***REMOVED***
      case 'string':
      default:
        return TextFilterHandler.instance().encode(
          (filterField as unknown) as IFilterField
        )
  ***REMOVED***
***REMOVED***
***REMOVED***

export interface ISort ***REMOVED***
  id: string
  desc: boolean
***REMOVED***

export const employeeFilterFields: IFilterField[] = [
  ***REMOVED*** fieldName: 'firstName', type: 'string', values: [] ***REMOVED***,
  ***REMOVED*** fieldName: 'lastName', type: 'string', values: [] ***REMOVED***,
  ***REMOVED*** fieldName: 'telkey', type: 'string', values: [] ***REMOVED***,
  ***REMOVED*** fieldName: 'governmentEmployeeId', type: 'string', values: [] ***REMOVED***,
  ***REMOVED*** fieldName: 'classification', type: 'string', values: [] ***REMOVED***,
  ***REMOVED*** fieldName: 'effectiveDate', type: 'date', values: [] ***REMOVED***
]
