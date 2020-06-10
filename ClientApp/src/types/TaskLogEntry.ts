import { dateOrUndefined } from '../helpers/objectHelper'
import { Transform } from 'class-transformer'

export class TaskLogEntry {
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string

  @Transform((date: string) => dateOrUndefined(date))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date))
  modifiedTs?: Date
}
