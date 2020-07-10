import { Transform } from 'class-transformer'
import { dateOrUndefined } from '../helpers/dateHelper'

export class EmployeeTimelineEntry {
  id?: string
  employeeId?: string
  employeeActionCode?: string
  employeeStatusCode?: string
  comment?: string
  adminUserName?: string

  @Transform((date: string) => dateOrUndefined(date, true))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date, true))
  modifiedTs?: Date
}
