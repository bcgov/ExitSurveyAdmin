import { dateOrUndefined } from '../helpers/dateHelper'
import { Transform } from 'class-transformer'

export class TaskLogEntry {
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string

  @Transform((date: string) => dateOrUndefined(date, true))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date, true))
  modifiedTs?: Date
}
