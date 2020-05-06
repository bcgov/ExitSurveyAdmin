import React from 'react'
import { Employee } from '../../types/Employee'
import { CellProps, Column } from 'react-table'
import { Link } from 'react-router-dom'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import { dateOrUndefined } from '../../helpers/objectHelper'

type EmployeeCellProps = React.PropsWithChildren<
  CellProps<Employee, string | undefined>
>

export const employeeTableColumns = (): Column<Employee>[] => [
  {
    Header: 'Telkey',
    accessor: 'telkey'
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
    Header: 'Classification',
    accessor: 'classification'
  },
  {
    Header: 'Leave date',
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <FormattedDate date={dateOrUndefined(props.value as string)} />
    ),
    accessor: 'effectiveDate'
  },
  {
    Header: 'Leave reason',
    accessor: 'reason'
  },
  {
    Header: 'Status',
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
    Cell: (props: EmployeeCellProps): JSX.Element => (
      <span>{props.value ? props.value.length : 0}</span>
    ),
    accessor: 'timelineEntries'
  }
]
