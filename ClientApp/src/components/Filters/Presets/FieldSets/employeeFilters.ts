import { IFilter } from '../../FilterClasses/FilterTypes'
import DateFilter from '../../FilterClasses/DateFilter'
import EnumFilter from '../../FilterClasses/EnumFilter'
import TextFilter from '../../FilterClasses/TextFilter'

export const employeeFilters: IFilter[] = [
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