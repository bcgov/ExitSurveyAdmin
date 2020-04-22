import IJSONSerializable from '../helpers/IJSONSerializable'
import { NullableString } from './NullableString'
import { undefinedIfNull } from '../helpers/objectHelper'

export interface IEmployeeTimelineEntryJSON {
  id: NullableString
  employeeId: NullableString
  employeeActionCode: NullableString
  employeeStatusCode: NullableString
  comment: NullableString
}

export class EmployeeTimelineEntry
  implements
    IJSONSerializable<EmployeeTimelineEntry, IEmployeeTimelineEntryJSON> {
  id?: string
  employeeId?: string
  employeeActionCode?: string
  employeeStatusCode?: string
  comment?: string

  constructor(input: IEmployeeTimelineEntryJSON) {
    this.deserialize(input)
  }

  deserialize(input: IEmployeeTimelineEntryJSON): EmployeeTimelineEntry {
    this.id = undefinedIfNull(input.id)
    this.employeeId = undefinedIfNull(input.employeeId)
    this.employeeStatusCode = undefinedIfNull(input.employeeStatusCode)
    this.employeeStatusCode = undefinedIfNull(input.employeeStatusCode)
    this.comment = undefinedIfNull(input.comment)

    return this
  }

  static deserializeArray(
    input: IEmployeeTimelineEntryJSON[] | null
  ): EmployeeTimelineEntry[] {
    if (!input) {
      return []
    } else {
      return input.map(json => new EmployeeTimelineEntry(json))
    }
  }
}
