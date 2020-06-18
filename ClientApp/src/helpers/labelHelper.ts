import { ISelectOption } from '../components/Employees/EditableSelect'
import { EmployeeStatus } from '../types/EmployeeStatus'
import { Reason } from '../types/Reason'
import { TaskOutcome } from '../types/TaskOutcome'

const fieldLabels: { [key: string]: string } = {
  id: 'Database ID',
  telkey: 'Telkey',
  recordCount: 'Record count',
  governmentEmployeeId: 'Employee ID',
  firstName: 'First name',
  preferredFirstName: 'Preferred first name',
  lastName: 'Last name',
  birthDate: 'Birth date',
  gender: 'Gender',
  governmentEmail: 'Email',
  preferredEmail: 'Preferred email',
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
  preferredAddress1: 'Preferred address line 1',
  preferredAddress2: 'Preferred address line 2',
  preferredAddressCity: 'Preferred address city',
  preferredAddressProvince: 'Preferred address province',
  preferredAddressPostCode: 'Preferred address post code',
  phone: 'Phone',
  appointmentStatus: 'Appointment status',
  positionCode: 'Position code',
  positionTitle: 'Position title',
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
  currentEmployeeStatusCode: 'Current status',
  timelineEntries: '',
  createdTs: 'Created date',
  modifiedTs: 'Last modified date',
  taskOutcomeCode: 'Status'
}

const optionsForEnum: { [key: string]: () => ISelectOption[] } = {
  currentEmployeeStatusCode: EmployeeStatus.toOptions,
  reason: Reason.toOptions,
  taskOutcomeCode: TaskOutcome.toOptions
}

export const labelFor = (fieldName: string): string => fieldLabels[fieldName]

export const optionsFor = (fieldName: string): ISelectOption[] => {
  const options = optionsForEnum[fieldName]().sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  return options
}
