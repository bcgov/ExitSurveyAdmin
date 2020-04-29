import IJSONSerializable from '../helpers/IJSONSerializable'
import ***REMOVED*** NullableString ***REMOVED*** from './NullableString'
import ***REMOVED*** dateOrUndefined, undefinedIfNull ***REMOVED*** from '../helpers/objectHelper'

export interface ITaskLogEntryJSON ***REMOVED***
  id: NullableString
  taskCode: NullableString
  taskOutcomeCode: NullableString
  comment: NullableString
  createdTs: NullableString
  modifiedTs: NullableString
***REMOVED***

export class TaskLogEntry
  implements IJSONSerializable<TaskLogEntry, ITaskLogEntryJSON> ***REMOVED***
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string
  createdTs?: Date
  modifiedTs?: Date

  constructor(input: ITaskLogEntryJSON) ***REMOVED***
    this.deserialize(input)
***REMOVED***

  deserialize(input: ITaskLogEntryJSON): TaskLogEntry ***REMOVED***
    this.id = undefinedIfNull(input.id)
    this.taskCode = undefinedIfNull(input.taskCode)
    this.taskOutcomeCode = undefinedIfNull(input.taskOutcomeCode)
    this.comment = undefinedIfNull(input.comment)
    this.createdTs = dateOrUndefined(input.createdTs)
    this.modifiedTs = dateOrUndefined(input.modifiedTs)

    return this
***REMOVED***

  static deserializeArray(input: ITaskLogEntryJSON[] | null): TaskLogEntry[] ***REMOVED***
    if (!input) ***REMOVED***
      return []
  ***REMOVED*** else ***REMOVED***
      return input.map(json => new TaskLogEntry(json))
  ***REMOVED***
***REMOVED***
***REMOVED***
