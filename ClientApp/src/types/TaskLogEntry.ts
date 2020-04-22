import IJSONSerializable from '../helpers/IJSONSerializable'
import ***REMOVED*** NullableString ***REMOVED*** from './NullableString'
import ***REMOVED*** undefinedIfNull ***REMOVED*** from '../helpers/objectHelper'

export interface ITaskLogEntryJSON ***REMOVED***
  id: NullableString
  taskCode: NullableString
  taskOutcomeCode: NullableString
  comment: NullableString
***REMOVED***

export class TaskLogEntry
  implements IJSONSerializable<TaskLogEntry, ITaskLogEntryJSON> ***REMOVED***
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string

  constructor(input: ITaskLogEntryJSON) ***REMOVED***
    this.deserialize(input)
***REMOVED***

  deserialize(input: ITaskLogEntryJSON): TaskLogEntry ***REMOVED***
    this.id = undefinedIfNull(input.id)
    this.taskCode = undefinedIfNull(input.taskCode)
    this.taskOutcomeCode = undefinedIfNull(input.taskOutcomeCode)
    this.comment = undefinedIfNull(input.comment)

    return this
***REMOVED***
***REMOVED***
