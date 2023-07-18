import ***REMOVED*** Transform ***REMOVED*** from 'class-transformer'
import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../helpers/dateHelper'

export class EmployeeTimelineEntry ***REMOVED***
  id?: string
  employeeId?: string
  employeeActionCode?: string
  employeeStatusCode?: string
  comment?: string
  adminUserName?: string

  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value, true))
  createdTs?: Date

  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value, true))
  modifiedTs?: Date
***REMOVED***
