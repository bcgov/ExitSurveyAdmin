import { Transform } from 'class-transformer'
import { dateOrUndefined } from '../helpers/dateHelper'

export class EmployeeTimelineEntry {
  id?: string
  employeeId?: string
  employeeActionCode?: string
  employeeStatusCode?: string
  comment?: string
  adminUserName?: string

  @Transform(({ value }: { value: string }) => dateOrUndefined(value, true))
  createdTs?: Date

  @Transform(({ value }: { value: string }) => dateOrUndefined(value, true))
  modifiedTs?: Date
}
