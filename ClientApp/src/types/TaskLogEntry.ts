import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../helpers/dateHelper'
import ***REMOVED*** Transform ***REMOVED*** from 'class-transformer'

export class TaskLogEntry ***REMOVED***
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string

  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value))
  createdTs?: Date

  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value))
  modifiedTs?: Date
***REMOVED***
