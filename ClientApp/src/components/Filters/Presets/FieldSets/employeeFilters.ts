import { IFilter } from '../../FilterClasses/FilterTypes'
import DateFilter from '../../FilterClasses/DateFilter'
import EnumFilter from '../../FilterClasses/EnumFilter'
import TextFilter from '../../FilterClasses/TextFilter'
import CustomFilter from '../../FilterClasses/CustomFilter'

export const employeeFilters: IFilter[] = [
  new TextFilter('telkey'),
  new TextFilter('governmentEmployeeId'),
  new TextFilter('preferredFirstName'),
  new TextFilter('lastName'),
  new TextFilter('preferredEmail'),
  new EnumFilter('appointmentStatus'),
  new DateFilter('effectiveDate'),
  new EnumFilter('currentEmployeeStatusCode'),
  new EnumFilter('reason'),
  new CustomFilter('blankEmail')
]
