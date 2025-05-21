import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../helpers/dateHelper'
import ***REMOVED*** EmployeeTimelineEntry ***REMOVED*** from './EmployeeTimelineEntry'
import ***REMOVED*** Reason, ReasonEnum ***REMOVED*** from './Reason'
import ***REMOVED*** EmployeeStatus, EmployeeStatusEnum ***REMOVED*** from './EmployeeStatus'
import ***REMOVED*** AppointmentStatus, AppointmentStatusEnum ***REMOVED*** from './AppointmentStatus'
import ***REMOVED*** Transform, Type ***REMOVED*** from 'class-transformer'

export class Employee ***REMOVED***
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
  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value))
  public birthDate?: Date
  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value))
  public originalHireDate?: Date
  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value))
  public lastDayWorkedDate?: Date
  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value))
  public effectiveDate?: Date
  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value))
  public leaveDate?: Date

  // UTC Datetimes
  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value, true))
  public createdTs?: Date
  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: string ***REMOVED***) => dateOrUndefined(value, true))
  public modifiedTs?: Date

  // Fields requiring custom transformation annotations
  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: ReasonEnum ***REMOVED***) => Reason.fromKey(value))
  public reason?: Reason

  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: AppointmentStatusEnum ***REMOVED***) =>
    AppointmentStatus.fromKey(value)
  )
  public appointmentStatus?: AppointmentStatus

  @Transform((***REMOVED*** value ***REMOVED***: ***REMOVED*** value: EmployeeStatusEnum ***REMOVED***) =>
    EmployeeStatus.fromKey(value)
  )
  public currentEmployeeStatusCode?: EmployeeStatus

  @Type(() => EmployeeTimelineEntry)
  public timelineEntries!: EmployeeTimelineEntry[]

  get timelineEntryCount(): number ***REMOVED***
    return this.timelineEntries.length
***REMOVED***
***REMOVED***
