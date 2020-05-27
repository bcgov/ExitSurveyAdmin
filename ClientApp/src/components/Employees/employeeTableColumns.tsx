import React from 'react'
import { Employee } from '../../types/Employee'
import { CellProps, Column } from 'react-table'
import { Link } from 'react-router-dom'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import { dateOrUndefined } from '../../helpers/objectHelper'
import { Reason } from '../../types/ReasonEnum'
import { EmployeeStatus } from '../../types/EmployeeStatusEnum'

type EmployeeCellProps = React.PropsWithChildren<
  CellProps<Employee, string | undefined>
>

export const employeeTableColumns = (): Column<Employee>[] => [
  {
    Header: 'Telkey',
    accessor: 'telkey'
  },
  {
    Header: 'Employee ID',
    accessor: 'governmentEmployeeId'
  },
  {
    Header: 'First name',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <Link to={`/employees/${props.cell.row.original.id}`}>{props.value}</Link>
    ),
    accessor: 'firstName'
  },
  {
    Header: 'Last name',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <Link to={`/employees/${props.cell.row.original.id}`}>{props.value}</Link>
    ),
    accessor: 'lastName'
  },
  {
    Header: 'Email',
    accessor: 'governmentEmail'
  },
  {
    Header: 'Exit count',
    accessor: 'exitCount'
  },
  {
    Header: 'Classification',
    accessor: 'classification'
  },
  {
    Header: 'Exit effective date',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <FormattedDate
        showLocalTimezone
        date={dateOrUndefined(props.value as string)}
      />
    ),
    accessor: 'effectiveDate'
  },
  {
    Header: 'Leave reason',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <>{((props.value as unknown) as Reason).reasonCode}</>
    ),
    accessor: 'reason'
  },
  {
    Header: 'Status',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <>{((props.value as unknown) as EmployeeStatus).displayName}</>
    ),
    accessor: 'currentEmployeeStatusCode'
  },
  {
    Header: 'Last modified date',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <FormattedDate
        date={dateOrUndefined(props.value as string)}
        showTime
        showLocalTimezone
      />
    ),
    accessor: 'modifiedTs'
  },
  {
    Header: 'Timeline Entries',
    accessor: 'timelineEntryCount'
  }
]
