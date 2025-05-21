import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../helpers/dateHelper'
import ***REMOVED*** Transform ***REMOVED*** from 'class-transformer'

export class AdminSetting ***REMOVED***
  id?: string
  key?: string
  displayName?: string
  value?: string

  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value, true))
  createdTs?: Date

  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value, true))
  modifiedTs?: Date
***REMOVED***
