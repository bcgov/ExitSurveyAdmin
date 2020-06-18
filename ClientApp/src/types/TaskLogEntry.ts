import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../helpers/dateHelper'
import ***REMOVED*** Transform ***REMOVED*** from 'class-transformer'

export class TaskLogEntry ***REMOVED***
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string

  @Transform((date: string) => dateOrUndefined(date))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date))
  modifiedTs?: Date
***REMOVED***
