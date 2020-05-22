import IJSONSerializable from '../helpers/IJSONSerializable'
import { NullableString } from './NullableString'
import { dateOrUndefined, undefinedIfNull } from '../helpers/objectHelper'
import {
  EmployeeTimelineEntry,
  IEmployeeTimelineEntryJSON
} from './EmployeeTimelineEntry'
import { Reason, ReasonEnum } from './ReasonEnum'
import { EmployeeStatus } from './EmployeeStatusEnum'
import { AppointmentStatus, AppointmentStatusEnum } from './AppointmentStatus'

export interface IEmployeeJSON {
  id: NullableString
  telkey: NullableString
  recordCount: NullableString
  governmentEmployeeId: NullableString
  firstName: NullableString
  lastName: NullableString
  birthDate: NullableString
  gender: NullableString
  governmentEmail: NullableString
  classification: NullableString
  ministry: NullableString
  departmentId: NullableString
  jobFunctionCode: NullableString
  locationCity: NullableString
  originalHireDate: NullableString
  lastDayWorkedDate: NullableString
  effectiveDate: NullableString
  reason: NullableString
  address1: NullableString
  address2: NullableString
  addressCity: NullableString
  addressProvince: NullableString
  addressPostCode: NullableString
  phone: NullableString
  appointmentStatus: NullableString
  positionCode: NullableString
  age: NullableString
  leaveDate: NullableString
  serviceYears: NullableString
  jobCode: NullableString
  backDated: NullableString
  exitCount: NullableString
  ageGroup: NullableString
  classificationGroup: NullableString
  serviceGroup: NullableString
  locationGroup: NullableString
  currentEmployeeStatusCode: NullableString
  currentEmployeeStatus: NullableString
  timelineEntries: IEmployeeTimelineEntryJSON[] | null
  createdTs: NullableString
  modifiedTs: NullableString
}

export const employeeFieldLabels: { [key: string]: string } = {
  id: 'Database ID',
  telkey: 'Telkey',
  recordCount: 'Record count',
  governmentEmployeeId: 'Employee ID',
  firstName: 'First name',
  lastName: 'Last name',
  birthDate: 'Birth date',
  gender: 'Gender',
  governmentEmail: 'Email',
  classification: 'Classification',
  ministry: 'Ministry',
  departmentId: 'Department ID',
  jobFunctionCode: 'Job function code',
  locationCity: 'Location city',
  originalHireDate: 'Original hire date',
  lastDayWorkedDate: 'Last day worked date',
  effectiveDate: 'Effective date',
  reason: 'Reason',
  address1: 'Address line 1',
  address2: 'Address line 2',
  addressCity: 'Address city',
  addressProvince: 'Address province',
  addressPostCode: 'Address post code',
  phone: 'Phone',
  appointmentStatus: 'Appointment status',
  positionCode: 'Position code',
  age: 'Age',
  leaveDate: 'Leave date',
  serviceYears: 'Service years',
  jobCode: 'Job code',
  backDated: 'Back dated',
  exitCount: 'Exit count',
  ageGroup: 'Age group',
  classificationGroup: 'Classification group',
  serviceGroup: 'Service group',
  locationGroup: 'Location group',
  currentEmployeeStatusCode: '',
  timelineEntries: '',
  createdTs: 'Created date',
  modifiedTs: 'Last modified date'
}

export class Employee implements IJSONSerializable<Employee, IEmployeeJSON> {
  id?: string
  telkey?: string
  recordCount?: string
  governmentEmployeeId?: string
  firstName?: string
  lastName?: string
  birthDate?: Date
  gender?: string
  governmentEmail?: string
  classification?: string
  ministry?: string
  departmentId?: string
  jobFunctionCode?: string
  locationCity?: string
  originalHireDate?: Date
  lastDayWorkedDate?: Date
  effectiveDate?: Date
  reason?: Reason
  address1?: string
  address2?: string
  addressCity?: string
  addressProvince?: string
  addressPostCode?: string
  phone?: string
  appointmentStatus?: AppointmentStatus
  positionCode?: string
  age?: string
  leaveDate?: Date
  serviceYears?: string
  jobCode?: string
  backDated?: string
  exitCount?: string
  ageGroup?: string
  classificationGroup?: string
  serviceGroup?: string
  locationGroup?: string
  currentEmployeeStatusCode?: EmployeeStatus
  timelineEntries!: EmployeeTimelineEntry[]
  createdTs?: Date
  modifiedTs?: Date

  constructor(input: IEmployeeJSON) {
    this.deserialize(input)
  }

  deserialize(input: IEmployeeJSON): Employee {
    this.id = undefinedIfNull(input.id)
    this.telkey = undefinedIfNull(input.telkey)
    this.recordCount = undefinedIfNull(input.recordCount)
    this.governmentEmployeeId = undefinedIfNull(input.governmentEmployeeId)
    this.firstName = undefinedIfNull(input.firstName)
    this.lastName = undefinedIfNull(input.lastName)
    this.birthDate = dateOrUndefined(input.birthDate)
    this.gender = undefinedIfNull(input.gender)
    this.governmentEmail = undefinedIfNull(input.governmentEmail)
    this.classification = undefinedIfNull(input.classification)
    this.ministry = undefinedIfNull(input.ministry)
    this.departmentId = undefinedIfNull(input.departmentId)
    this.jobFunctionCode = undefinedIfNull(input.jobFunctionCode)
    this.locationCity = undefinedIfNull(input.locationCity)
    this.originalHireDate = dateOrUndefined(input.originalHireDate)
    this.lastDayWorkedDate = dateOrUndefined(input.lastDayWorkedDate)
    this.effectiveDate = dateOrUndefined(input.effectiveDate)
    this.reason = Reason.reasonByKey(
      undefinedIfNull(input.reason) as ReasonEnum
    )
    this.address1 = undefinedIfNull(input.address1)
    this.address2 = undefinedIfNull(input.address2)
    this.addressCity = undefinedIfNull(input.addressCity)
    this.addressProvince = undefinedIfNull(input.addressProvince)
    this.addressPostCode = undefinedIfNull(input.addressPostCode)
    this.phone = undefinedIfNull(input.phone)
    this.appointmentStatus = AppointmentStatus.statusByKey(
      undefinedIfNull(input.appointmentStatus) as AppointmentStatusEnum
    )
    this.positionCode = undefinedIfNull(input.positionCode)
    this.age = undefinedIfNull(input.age)
    this.leaveDate = dateOrUndefined(input.leaveDate)
    this.serviceYears = undefinedIfNull(input.serviceYears)
    this.jobCode = undefinedIfNull(input.jobCode)
    this.backDated = undefinedIfNull(input.backDated)
    this.exitCount = undefinedIfNull(input.exitCount)
    this.ageGroup = undefinedIfNull(input.ageGroup)
    this.classificationGroup = undefinedIfNull(input.classificationGroup)
    this.serviceGroup = undefinedIfNull(input.serviceGroup)
    this.locationGroup = undefinedIfNull(input.locationGroup)
    this.currentEmployeeStatusCode = EmployeeStatus.statusByKey(
      undefinedIfNull(input.currentEmployeeStatusCode)
    )
    this.timelineEntries = EmployeeTimelineEntry.deserializeArray(
      input.timelineEntries
    )
    this.createdTs = dateOrUndefined(input.createdTs)
    this.modifiedTs = dateOrUndefined(input.modifiedTs)

    return this
  }

  static deserializeArray(input: IEmployeeJSON[] | null): Employee[] {
    if (!input) {
      return []
    } else {
      return input.map(json => new Employee(json))
    }
  }
}
