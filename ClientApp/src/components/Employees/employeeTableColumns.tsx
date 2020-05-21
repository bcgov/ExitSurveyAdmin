import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** CellProps, Column ***REMOVED*** from 'react-table'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../../helpers/objectHelper'

type EmployeeCellProps = React.PropsWithChildren<
  CellProps<Employee, string | undefined>
>

export const employeeTableColumns = (): Column<Employee>[] => [
  ***REMOVED***
    Header: 'Telkey',
    accessor: 'telkey'
***REMOVED***
  ***REMOVED***
    Header: 'Employee ID',
    accessor: 'governmentEmployeeId'
***REMOVED***
  ***REMOVED***
    Header: 'First name',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <Link to=***REMOVED***`/employees/$***REMOVED***props.cell.row.original.id***REMOVED***`***REMOVED***>***REMOVED***props.value***REMOVED***</Link>
    ),
    accessor: 'firstName'
***REMOVED***
  ***REMOVED***
    Header: 'Last name',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <Link to=***REMOVED***`/employees/$***REMOVED***props.cell.row.original.id***REMOVED***`***REMOVED***>***REMOVED***props.value***REMOVED***</Link>
    ),
    accessor: 'lastName'
***REMOVED***
  ***REMOVED***
    Header: 'Email',
    accessor: 'governmentEmail'
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
        date=***REMOVED***dateOrUndefined(props.value as string)***REMOVED***
      />
    ),
    accessor: 'effectiveDate'
***REMOVED***
  ***REMOVED***
    Header: 'Leave reason',
    accessor: 'reason'
***REMOVED***
  ***REMOVED***
    Header: 'Status',
    accessor: 'currentEmployeeStatusCode'
***REMOVED***
  ***REMOVED***
    Header: 'Last modified date',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <FormattedDate
        date=***REMOVED***dateOrUndefined(props.value as string)***REMOVED***
        showTime
        showLocalTimezone
      />
    ),
    accessor: 'modifiedTs'
***REMOVED***
  ***REMOVED***
    Header: 'Timeline Entries',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <span>***REMOVED***props.value ? props.value.length : 0***REMOVED***</span>
    ),
    accessor: 'timelineEntries'
***REMOVED***
]
