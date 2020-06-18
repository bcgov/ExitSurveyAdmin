import TextFilter from './TextFilter'
import DateFilter from './DateFilter'
import EnumFilter from './EnumFilter'

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

export const filterableFields: IFilter[] = [
  new TextFilter('telkey'),
  new TextFilter('governmentEmployeeId'),
  new TextFilter('firstName'),
  new TextFilter('lastName'),
  new TextFilter('governmentEmail'),
  new TextFilter('classification'),
  new DateFilter('effectiveDate'),
  new EnumFilter('currentEmployeeStatusCode'),
  new EnumFilter('reason')
]
