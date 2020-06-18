import ***REMOVED*** Transform ***REMOVED*** from 'class-transformer'
import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../helpers/dateHelper'

export class EmployeeTimelineEntry ***REMOVED***
  id?: string
  employeeId?: string
  employeeActionCode?: string
  employeeStatusCode?: string
  comment?: string
  adminUserName?: string

  @Transform((date: string) => dateOrUndefined(date))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date))
  modifiedTs?: Date
***REMOVED***
