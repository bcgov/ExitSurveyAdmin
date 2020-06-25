import React from 'react'
import ***REMOVED*** CellProps, Column ***REMOVED*** from 'react-table'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'

import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** EmployeeStatus ***REMOVED*** from '../../types/EmployeeStatus'
import ***REMOVED*** Reason ***REMOVED*** from '../../types/Reason'
import FormattedDate from '../DisplayHelpers/FormattedDate'

type EmployeeCellProps = React.PropsWithChildren<
  CellProps<Employee, string | undefined>
>

export const employeeTableColumns = (): Column<Employee>[] => [
  ***REMOVED***
    Header: 'Telkey',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <Link to=***REMOVED***`/employees/$***REMOVED***props.cell.row.original.id***REMOVED***`***REMOVED***>***REMOVED***props.value***REMOVED***</Link>
    ),
    accessor: 'telkey'
***REMOVED***
  ***REMOVED***
    Header: 'Employee ID',
    accessor: 'governmentEmployeeId'
***REMOVED***
  ***REMOVED***
    Header: 'Preferred first name',
    accessor: 'preferredFirstName'
***REMOVED***
  ***REMOVED***
    Header: 'Last name',
    accessor: 'lastName'
***REMOVED***
  ***REMOVED***
    Header: 'Preferred email',
    accessor: 'preferredEmail'
***REMOVED***
  ***REMOVED***
    Header: 'Exit count',
    accessor: 'exitCount'
***REMOVED***
  ***REMOVED***
    Header: 'Classification',
    accessor: 'classification'
***REMOVED***
  ***REMOVED***
    Header: 'Exit effective date',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <FormattedDate
        showLocalTimezone
        date=***REMOVED***(props.value as unknown) as Date***REMOVED***
      />
    ),
    accessor: 'effectiveDate'
***REMOVED***
  ***REMOVED***
    Header: 'Leave reason',
    Cell: (props: EmployeeCellProps): JSX.Element => ***REMOVED***
      const reason = (props.value as unknown) as Reason
      return <>***REMOVED***reason ? reason.reasonCode : '[Unknown Reason]'***REMOVED***</>
  ***REMOVED***
    accessor: 'reason'
***REMOVED***
  ***REMOVED***
    Header: 'Status',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <>***REMOVED***((props.value as unknown) as EmployeeStatus).displayName***REMOVED***</>
    ),
    accessor: 'currentEmployeeStatusCode'
***REMOVED***
  ***REMOVED***
    Header: 'Last modified date',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <FormattedDate
        date=***REMOVED***(props.value as unknown) as Date***REMOVED***
        showTime
        showLocalTimezone
      />
    ),
    accessor: 'modifiedTs'
***REMOVED***
  ***REMOVED***
    Header: 'Timeline Entries',
    accessor: 'timelineEntryCount'
***REMOVED***
]
