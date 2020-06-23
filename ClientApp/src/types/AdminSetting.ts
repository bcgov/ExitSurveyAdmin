import { dateOrUndefined } from '../helpers/dateHelper'
import { Transform } from 'class-transformer'

export class AdminSetting {
  id?: string
  key?: string
  displayName?: string
  value?: string

  @Transform((date: string) => dateOrUndefined(date, true))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date, true))
  modifiedTs?: Date
}
