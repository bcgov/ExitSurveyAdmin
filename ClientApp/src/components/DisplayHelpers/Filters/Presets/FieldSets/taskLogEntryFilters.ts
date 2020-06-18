// import TextFilter from './TextFilter'
import DateFilter from '../../FilterClasses/DateFilter'
// import EnumFilter from './EnumFilter'
import { IFilter } from '../../FilterClasses/FilterTypes'
import EnumFilter from '../../FilterClasses/EnumFilter'

export const taskLogEntryFilters: IFilter[] = [
  new DateFilter('createdTs'),
  new EnumFilter('taskOutcomeCode')
]