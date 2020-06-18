import TextFilter from '../../FilterClasses/TextFilter'
import DateFilter from '../../FilterClasses/DateFilter'
import { IFilter } from '../../FilterClasses/FilterTypes'
import EnumFilter from '../../FilterClasses/EnumFilter'

export const taskLogEntryFilters: IFilter[] = [
  new DateFilter('createdTs'),
  new EnumFilter('taskOutcomeCode'),
  new TextFilter('comment')
]
