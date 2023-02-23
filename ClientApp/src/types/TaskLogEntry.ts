import { dateOrUndefined } from '../helpers/dateHelper'
import { Transform } from 'class-transformer'

export class TaskLogEntry {
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string

  @Transform(({ value }: { value: string }) => dateOrUndefined(value))
  createdTs?: Date

  @Transform(({ value }: { value: string }) => dateOrUndefined(value))
  modifiedTs?: Date
}
