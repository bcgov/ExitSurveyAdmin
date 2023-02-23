import { dateOrUndefined } from '../helpers/dateHelper'
import { Transform } from 'class-transformer'

export class AdminSetting {
  id?: string
  key?: string
  displayName?: string
  value?: string

  @Transform(({ value }: { value: string }) => dateOrUndefined(value, true))
  createdTs?: Date

  @Transform(({ value }: { value: string }) => dateOrUndefined(value, true))
  modifiedTs?: Date
}
