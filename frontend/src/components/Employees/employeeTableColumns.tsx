import React from 'react'
import ***REMOVED*** createColumnHelper, ColumnDef ***REMOVED*** from '@tanstack/react-table'
import ***REMOVED*** Link ***REMOVED*** from 'react-router'

import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** EmployeeStatus ***REMOVED*** from '../../types/EmployeeStatus'
import ***REMOVED*** Reason ***REMOVED*** from '../../types/Reason'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import ***REMOVED*** AppointmentStatus ***REMOVED*** from '../../types/AppointmentStatus'

const columnHelper = createColumnHelper<Employee>()

export const employeeTableColumns = (): ColumnDef<Employee, any>[] => [
  columnHelper.accessor('telkey', ***REMOVED***
    header: 'Telkey',
    cell: (info: any) => <Link to=***REMOVED***`/employees/$***REMOVED***info.row.original.id***REMOVED***`***REMOVED***>***REMOVED***info.getValue()***REMOVED***</Link>,
***REMOVED***),
  columnHelper.accessor('governmentEmployeeId', ***REMOVED***
    header: 'Employee ID',
***REMOVED***),
  columnHelper.accessor('preferredFirstName', ***REMOVED***
    header: 'Preferred first name',
***REMOVED***),
  columnHelper.accessor('lastName', ***REMOVED***
    header: 'Last name',
***REMOVED***),
  columnHelper.accessor('preferredEmail', ***REMOVED***
    header: 'Preferred email',
***REMOVED***),
  columnHelper.accessor('exitCount', ***REMOVED***
    header: 'Exit count',
***REMOVED***),
  columnHelper.accessor('recordCount', ***REMOVED***
    header: 'Record count',
***REMOVED***),
  columnHelper.accessor('appointmentStatus', ***REMOVED***
    header: 'Appointment status',
    cell: (info: any) => ***REMOVED***
      const appointmentStatus = info.getValue() as unknown as AppointmentStatus
      return <>***REMOVED***appointmentStatus ? appointmentStatus.code : '[Unknown Appointment Status]'***REMOVED***</>
  ***REMOVED***
***REMOVED***),
  columnHelper.accessor('effectiveDate', ***REMOVED***
    header: 'Exit effective date',
    cell: (info: any) => <FormattedDate showLocalTimezone date=***REMOVED***info.getValue() as unknown as Date***REMOVED*** />,
***REMOVED***),
  columnHelper.accessor('reason', ***REMOVED***
    header: 'Leave reason',
    cell: (info: any) => ***REMOVED***
      const reason = info.getValue() as unknown as Reason
      return <>***REMOVED***reason ? reason.reasonCode : '[Unknown Reason]'***REMOVED***</>
  ***REMOVED***
***REMOVED***),
  columnHelper.accessor('currentEmployeeStatusCode', ***REMOVED***
    header: 'Status',
    cell: (info: any) => <>***REMOVED***(info.getValue() as unknown as EmployeeStatus).displayName***REMOVED***</>,
***REMOVED***),
  columnHelper.accessor('modifiedTs', ***REMOVED***
    header: 'Last modified time',
    cell: (info: any) => <FormattedDate date=***REMOVED***info.getValue() as unknown as Date***REMOVED*** showTime showLocalTimezone />,
***REMOVED***),
  columnHelper.accessor('timelineEntryCount', ***REMOVED***
    header: 'Timeline Entries',
***REMOVED***),
]
