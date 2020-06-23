import { dateOrUndefined } from '../helpers/dateHelper'
import { Transform } from 'class-transformer'

export class AdminSetting {
  id?: string
  key?: string
  displayName?: string
  value?: string

  @Transform((date: string) => dateOrUndefined(date))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date))
  modifiedTs?: Date
}
