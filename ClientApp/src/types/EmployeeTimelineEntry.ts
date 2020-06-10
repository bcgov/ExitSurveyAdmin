import { Transform } from 'class-transformer'
import { dateOrUndefined } from '../helpers/objectHelper'

export class EmployeeTimelineEntry {
  id?: string
  employeeId?: string
  employeeActionCode?: string
  employeeStatusCode?: string
  comment?: string

  @Transform((date: string) => dateOrUndefined(date))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date))
  modifiedTs?: Date
}
