import IJSONSerializable from '../helpers/IJSONSerializable'
import ***REMOVED*** NullableString ***REMOVED*** from './NullableString'
import ***REMOVED*** dateOrUndefined, undefinedIfNull ***REMOVED*** from '../helpers/objectHelper'

export interface IEmployeeTimelineEntryJSON ***REMOVED***
  id: NullableString
  employeeId: NullableString
  employeeActionCode: NullableString
  employeeStatusCode: NullableString
  comment: NullableString
  createdTs: NullableString
  modifiedTs: NullableString
***REMOVED***

export class EmployeeTimelineEntry
  implements
    IJSONSerializable<EmployeeTimelineEntry, IEmployeeTimelineEntryJSON> ***REMOVED***
  id?: string
  employeeId?: string
  employeeActionCode?: string
  employeeStatusCode?: string
  comment?: string
  createdTs?: Date
  modifiedTs?: Date

  constructor(input: IEmployeeTimelineEntryJSON) ***REMOVED***
    this.deserialize(input)
***REMOVED***

  deserialize(input: IEmployeeTimelineEntryJSON): EmployeeTimelineEntry ***REMOVED***
    this.id = undefinedIfNull(input.id)
    this.employeeId = undefinedIfNull(input.employeeId)
    this.employeeActionCode = undefinedIfNull(input.employeeActionCode)
    this.employeeStatusCode = undefinedIfNull(input.employeeStatusCode)
    this.comment = undefinedIfNull(input.comment)
    this.createdTs = dateOrUndefined(input.createdTs)
    this.modifiedTs = dateOrUndefined(input.modifiedTs)

    return this
***REMOVED***

  static deserializeArray(
    input: IEmployeeTimelineEntryJSON[] | null
  ): EmployeeTimelineEntry[] ***REMOVED***
    if (!input) ***REMOVED***
      return []
  ***REMOVED*** else ***REMOVED***
      return input.map(json => new EmployeeTimelineEntry(json))
  ***REMOVED***
***REMOVED***
***REMOVED***
