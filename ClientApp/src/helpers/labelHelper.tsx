import React from 'react'

import { SelectOption } from '../components/DisplayHelpers/Interface/EditableFields/EditableSelect'
import { EmployeeStatus } from '../types/EmployeeStatus'
import { Reason } from '../types/Reason'
import { TaskOutcome } from '../types/TaskOutcome'
import { AppointmentStatus } from '../types/AppointmentStatus'
import { Employee } from '../types/Employee'
import FAIcon from '../components/DisplayHelpers/Interface/Icons/FAIcon'
import { TaskEnum } from '../types/TaskEnum'

const fieldLabels: { [key: string]: string } = {
  address1: 'Address line 1',
  address2: 'Address line 2',
  addressCity: 'Address city',
  addressPostCode: 'Address post code',
  addressProvince: 'Address province',
  age: 'Age',
  ageGroup: 'Age group',
  appointmentStatus: 'Appointment status',
  backDated: 'Back dated',
  birthDate: 'Birth date',
  blankEmail: 'Preferred email',
  classification: 'Classification',
  classificationGroup: 'Classification group',
  comment: 'Comment',
  createdTs: 'Created date',
  currentEmployeeStatusCode: 'Current status',
  departmentId: 'Department ID',
  effectiveDate: 'Effective date',
  exitCount: 'Exit count',
  firstName: 'First name',
  gender: 'Gender',
  governmentEmail: 'Email',
  governmentEmployeeId: 'Employee ID',
  id: 'Database ID',
  jobCode: 'Job code',
  jobFunctionCode: 'Job function code',
  lastDayWorkedDate: 'Last day worked date',
  lastName: 'Last name',
  leaveDate: 'Leave date',
  locationCity: 'Location city',
  locationGroup: 'Location group',
  ministry: 'Ministry',
  logDate: 'Log date',
  modifiedTs: 'Last modified date',
  originalHireDate: 'Original hire date',
  phone: 'Phone',
  positionCode: 'Position code',
  positionTitle: 'Position title',
  preferredAddress: 'Preferred address',
  preferredAddress1: 'Preferred address line 1',
  preferredAddress2: 'Preferred address line 2',
  preferredAddressCity: 'Preferred address city',
  preferredAddressPostCode: 'Preferred address post code',
  preferredAddressProvince: 'Preferred address province',
  preferredEmail: 'Preferred email',
  preferredFirstName: 'Preferred first name',
  reason: 'Reason',
  recordCount: 'Record count',
  serviceGroup: 'Service group',
  serviceYears: 'Service years',
  taskCode: 'Task',
  taskOutcomeCode: 'Status',
  telkey: 'Telkey',
  timelineEntries: '',
  triedToUpdateInFinalState: 'Tried to update in final state',
}

const mapEnumToOptions = (
  enumeration: Record<string, string>
): (() => SelectOption[]) => {
  return (): SelectOption[] => {
    return Object.keys(enumeration).map((enumKey) => ({
      name: enumeration[enumKey],
      value: enumKey,
    }))
  }
}

const optionsForEnum: { [key: string]: () => SelectOption[] } = {
  currentEmployeeStatusCode: EmployeeStatus.toOptions,
  reason: Reason.toOptions,
  taskOutcomeCode: TaskOutcome.toOptions,
  taskCode: mapEnumToOptions(TaskEnum),
  appointmentStatus: AppointmentStatus.toOptions,
}

export const labelFor = (fieldName: string): string => fieldLabels[fieldName]

export const labelForWithFlag = (
  fieldName: string,
  employee: Employee,
  flagTest?: (e: Employee) => boolean
): JSX.Element => {
  const flagIsSet = flagTest
    ? flagTest(employee)
    : employee[`${fieldName}Flag` as keyof Employee]
  return (
    <span
      title={flagIsSet ? 'This field has been edited by an admin' : undefined}
    >
      {fieldLabels[fieldName]}{' '}
      {flagIsSet && <FAIcon name="flag" marginClasses="ml-1" />}
    </span>
  )
}

export const optionsFor = (fieldName: string): SelectOption[] => {
  const options = optionsForEnum[fieldName]().sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  return options
}
