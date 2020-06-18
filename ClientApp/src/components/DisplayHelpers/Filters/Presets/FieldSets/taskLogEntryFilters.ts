// import TextFilter from './TextFilter'
import DateFilter from '../../FilterClasses/DateFilter'
// import EnumFilter from './EnumFilter'
import { IFilter } from '../../FilterClasses/FilterTypes'

export const taskLogEntryFilters: IFilter[] = [new DateFilter('createdTs')]
