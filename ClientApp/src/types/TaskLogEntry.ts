import IJSONSerializable from '../helpers/IJSONSerializable'
import { NullableString } from './NullableString'
import { undefinedIfNull } from '../helpers/objectHelper'

export interface ITaskLogEntryJSON {
  id: NullableString
  taskCode: NullableString
  taskOutcomeCode: NullableString
  comment: NullableString
}

export class TaskLogEntry
  implements IJSONSerializable<TaskLogEntry, ITaskLogEntryJSON> {
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string

  constructor(input: ITaskLogEntryJSON) {
    this.deserialize(input)
  }

  deserialize(input: ITaskLogEntryJSON): TaskLogEntry {
    this.id = undefinedIfNull(input.id)
    this.taskCode = undefinedIfNull(input.taskCode)
    this.taskOutcomeCode = undefinedIfNull(input.taskOutcomeCode)
    this.comment = undefinedIfNull(input.comment)

    return this
  }
}
