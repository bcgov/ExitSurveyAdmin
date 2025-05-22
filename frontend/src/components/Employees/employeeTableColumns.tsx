import React from 'react'
import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'

import { Employee } from '../../types/Employee'
import { EmployeeStatus } from '../../types/EmployeeStatus'
import { Reason } from '../../types/Reason'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import { AppointmentStatus } from '../../types/AppointmentStatus'

const columnHelper = createColumnHelper<Employee>()

export const employeeTableColumns = (): ColumnDef<Employee, any>[] => [
  columnHelper.accessor('telkey', {
    header: 'Telkey',
    cell: (info: any) => <Link to={`/employees/${info.row.original.id}`}>{info.getValue()}</Link>,
  }),
  columnHelper.accessor('governmentEmployeeId', {
    header: 'Employee ID',
  }),
  columnHelper.accessor('preferredFirstName', {
    header: 'Preferred first name',
  }),
  columnHelper.accessor('lastName', {
    header: 'Last name',
  }),
  columnHelper.accessor('preferredEmail', {
    header: 'Preferred email',
  }),
  columnHelper.accessor('exitCount', {
    header: 'Exit count',
  }),
  columnHelper.accessor('recordCount', {
    header: 'Record count',
  }),
  columnHelper.accessor('appointmentStatus', {
    header: 'Appointment status',
    cell: (info: any) => {
      const appointmentStatus = info.getValue() as unknown as AppointmentStatus
      return <>{appointmentStatus ? appointmentStatus.code : '[Unknown Appointment Status]'}</>
    },
  }),
  columnHelper.accessor('effectiveDate', {
    header: 'Exit effective date',
    cell: (info: any) => <FormattedDate showLocalTimezone date={info.getValue() as unknown as Date} />,
  }),
  columnHelper.accessor('reason', {
    header: 'Leave reason',
    cell: (info: any) => {
      const reason = info.getValue() as unknown as Reason
      return <>{reason ? reason.reasonCode : '[Unknown Reason]'}</>
    },
  }),
  columnHelper.accessor('currentEmployeeStatusCode', {
    header: 'Status',
    cell: (info: any) => <>{(info.getValue() as unknown as EmployeeStatus).displayName}</>,
  }),
  columnHelper.accessor('modifiedTs', {
    header: 'Last modified time',
    cell: (info: any) => <FormattedDate date={info.getValue() as unknown as Date} showTime showLocalTimezone />,
  }),
  columnHelper.accessor('timelineEntryCount', {
    header: 'Timeline Entries',
  }),
]
