import IJSONSerializable from '../helpers/IJSONSerializable'
import ***REMOVED*** NullableString ***REMOVED*** from './NullableString'
import ***REMOVED*** undefinedIfNull ***REMOVED*** from '../helpers/objectHelper'

export interface IEmployeeTimelineEntryJSON ***REMOVED***
  id: NullableString
  employeeId: NullableString
  employeeActionCode: NullableString
  employeeStatusCode: NullableString
  comment: NullableString
***REMOVED***

export class EmployeeTimelineEntry
  implements
    IJSONSerializable<EmployeeTimelineEntry, IEmployeeTimelineEntryJSON> ***REMOVED***
  id?: string
  employeeId?: string
  employeeActionCode?: string
  employeeStatusCode?: string
  comment?: string

  constructor(input: IEmployeeTimelineEntryJSON) ***REMOVED***
    this.deserialize(input)
***REMOVED***

  deserialize(input: IEmployeeTimelineEntryJSON): EmployeeTimelineEntry ***REMOVED***
    this.id = undefinedIfNull(input.id)
    this.employeeId = undefinedIfNull(input.employeeId)
    this.employeeStatusCode = undefinedIfNull(input.employeeStatusCode)
    this.employeeStatusCode = undefinedIfNull(input.employeeStatusCode)
    this.comment = undefinedIfNull(input.comment)

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
