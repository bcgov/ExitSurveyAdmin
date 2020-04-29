import IJSONSerializable from '../helpers/IJSONSerializable'
import { NullableString } from './NullableString'
import { dateOrUndefined, undefinedIfNull } from '../helpers/objectHelper'

export interface ITaskLogEntryJSON {
  id: NullableString
  taskCode: NullableString
  taskOutcomeCode: NullableString
  comment: NullableString
  createdTs: NullableString
  modifiedTs: NullableString
}

export class TaskLogEntry
  implements IJSONSerializable<TaskLogEntry, ITaskLogEntryJSON> {
  id?: string
  taskCode?: string
  taskOutcomeCode?: string
  comment?: string
  createdTs?: Date
  modifiedTs?: Date

  constructor(input: ITaskLogEntryJSON) {
    this.deserialize(input)
  }

  deserialize(input: ITaskLogEntryJSON): TaskLogEntry {
    this.id = undefinedIfNull(input.id)
    this.taskCode = undefinedIfNull(input.taskCode)
    this.taskOutcomeCode = undefinedIfNull(input.taskOutcomeCode)
    this.comment = undefinedIfNull(input.comment)
    this.createdTs = dateOrUndefined(input.createdTs)
    this.modifiedTs = dateOrUndefined(input.modifiedTs)

    return this
  }

  static deserializeArray(input: ITaskLogEntryJSON[] | null): TaskLogEntry[] {
    if (!input) {
      return []
    } else {
      return input.map(json => new TaskLogEntry(json))
    }
  }
}
