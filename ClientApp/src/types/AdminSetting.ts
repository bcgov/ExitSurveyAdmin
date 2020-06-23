import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../helpers/dateHelper'
import ***REMOVED*** Transform ***REMOVED*** from 'class-transformer'

export class AdminSetting ***REMOVED***
  id?: string
  key?: string
  displayName?: string
  value?: string

  @Transform((date: string) => dateOrUndefined(date, true))
  createdTs?: Date

  @Transform((date: string) => dateOrUndefined(date, true))
  modifiedTs?: Date
***REMOVED***
