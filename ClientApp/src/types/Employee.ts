import { dateOrUndefined } from '../helpers/dateHelper'
import { EmployeeTimelineEntry } from './EmployeeTimelineEntry'
import { Reason, ReasonEnum } from './Reason'
import { EmployeeStatus, EmployeeStatusEnum } from './EmployeeStatus'
import { AppointmentStatus, AppointmentStatusEnum } from './AppointmentStatus'
import { Transform, Type } from 'class-transformer'

export class Employee {
  public id?: string
  public telkey?: string
  public recordCount?: string
  public governmentEmployeeId?: string
  public firstName?: string
  public preferredFirstName?: string
  public preferredFirstNameFlag?: boolean
  public lastName?: string
  public gender?: string
  public governmentEmail?: string
  public preferredEmail?: string
  public preferredEmailFlag?: boolean
  public classification?: string
  public ministry?: string
  public departmentId?: string
  public jobFunctionCode?: string
  public locationCity?: string
  public address1?: string
  public address2?: string
  public addressCity?: string
  public addressProvince?: string
  public addressPostCode?: string
  public preferredAddress1?: string
  public preferredAddress2?: string
  public preferredAddressCity?: string
  public preferredAddressProvince?: string
  public preferredAddressPostCode?: string
  public preferredAddress1Flag?: boolean
  public preferredAddress2Flag?: boolean
  public preferredAddressCityFlag?: boolean
  public preferredAddressProvinceFlag?: boolean
  public preferredAddressPostCodeFlag?: boolean
  public phone?: string
  public positionCode?: string
  public positionTitle?: string
  public age?: string
  public serviceYears?: string
  public jobCode?: string
  public backDated?: string
  public exitCount?: string
  public ageGroup?: string
  public classificationGroup?: string
  public serviceGroup?: string
  public locationGroup?: string
  public triedToUpdateInFinalState?: boolean

  // Dates
  @Transform((date: string) => dateOrUndefined(date))
  public birthDate?: Date
  @Transform((date: string) => dateOrUndefined(date))
  public originalHireDate?: Date
  @Transform((date: string) => dateOrUndefined(date))
  public lastDayWorkedDate?: Date
  @Transform((date: string) => dateOrUndefined(date))
  public effectiveDate?: Date
  @Transform((date: string) => dateOrUndefined(date))
  public leaveDate?: Date

  // UTC Datetimes
  @Transform((date: string) => dateOrUndefined(date, true))
  public createdTs?: Date
  @Transform((date: string) => dateOrUndefined(date, true))
  public modifiedTs?: Date

  // Fields requiring custom transformation annotations
  @Transform((k: ReasonEnum) => Reason.fromKey(k))
  public reason?: Reason

  @Transform((k: AppointmentStatusEnum) => AppointmentStatus.fromKey(k))
  public appointmentStatus?: AppointmentStatus

  @Transform((k: EmployeeStatusEnum) => EmployeeStatus.fromKey(k))
  public currentEmployeeStatusCode?: EmployeeStatus

  @Type(() => EmployeeTimelineEntry)
  public timelineEntries!: EmployeeTimelineEntry[]

  get timelineEntryCount(): number {
    return this.timelineEntries.length
  }
}
