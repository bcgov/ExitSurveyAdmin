import IJSONSerializable from '../helpers/IJSONSerializable'
import ***REMOVED*** NullableString ***REMOVED*** from './NullableString'
import ***REMOVED***
  dateOrUndefined,
  emptyStringIfNull,
  undefinedIfNull
***REMOVED*** from '../helpers/objectHelper'
import ***REMOVED***
  EmployeeTimelineEntry,
  IEmployeeTimelineEntryJSON
***REMOVED*** from './EmployeeTimelineEntry'

export interface IEmployeeJSON ***REMOVED***
  id: NullableString
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
***REMOVED***

export class Employee implements IJSONSerializable<Employee, IEmployeeJSON> ***REMOVED***
  id?: string
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
  reason?: string
  address1?: string
  address2?: string
  addressCity?: string
  addressProvince?: string
  addressPostCode?: string
  phone?: string
  appointmentStatus?: string
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
  currentEmployeeStatusCode?: string
  currentEmployeeStatus?: string
  timelineEntries!: EmployeeTimelineEntry[]
  createdTs?: Date
  modifiedTs?: Date

  constructor(input: IEmployeeJSON) ***REMOVED***
    this.deserialize(input)
***REMOVED***

  deserialize(input: IEmployeeJSON): Employee ***REMOVED***
    this.id = undefinedIfNull(input.id)
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
    this.reason = undefinedIfNull(input.reason)
    this.address1 = undefinedIfNull(input.address1)
    this.address2 = undefinedIfNull(input.address2)
    this.addressCity = undefinedIfNull(input.addressCity)
    this.addressProvince = undefinedIfNull(input.addressProvince)
    this.addressPostCode = undefinedIfNull(input.addressPostCode)
    this.phone = undefinedIfNull(input.phone)
    this.appointmentStatus = undefinedIfNull(input.appointmentStatus)
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
    this.currentEmployeeStatusCode = undefinedIfNull(
      input.currentEmployeeStatusCode
    )
    this.currentEmployeeStatus = undefinedIfNull(input.currentEmployeeStatus)
    this.timelineEntries = EmployeeTimelineEntry.deserializeArray(
      input.timelineEntries
    )
    this.createdTs = dateOrUndefined(input.createdTs)
    this.modifiedTs = dateOrUndefined(input.modifiedTs)

    return this
***REMOVED***

  static deserializeArray(input: IEmployeeJSON[] | null): Employee[] ***REMOVED***
    if (!input) ***REMOVED***
      return []
  ***REMOVED*** else ***REMOVED***
      return input.map(json => new Employee(json))
  ***REMOVED***
***REMOVED***
***REMOVED***
