/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import { Employee } from '../../types/Employee'
import {
  CellProps,
  Column,
  useFilters,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'
import { Link } from 'react-router-dom'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import { dateOrUndefined } from '../../helpers/objectHelper'
import { FixTypeLater } from '../../types/FixTypeLater'

interface IProps {
  data: Employee[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  recordCount: number
}

type EmployeeCellProps = React.PropsWithChildren<
  CellProps<Employee, string | undefined>
>

const EmployeeTable = (props: IProps): JSX.Element => {
  const { data, fetchData, loading, controlledPageCount, recordCount } = props

  const columns = React.useMemo(
    (): Column<Employee>[] => [
      {
        Header: 'Telkey',
        accessor: 'telkey'
      },
      {
        Header: 'First name',
        Cell: (props: EmployeeCellProps): JSX.Element => (
          <Link to={`/employees/${props.cell.row.original.id}`}>
            {props.value}
          </Link>
        ),
        accessor: 'firstName'
      },
      {
        Header: 'Last name',
        Cell: (props: EmployeeCellProps): JSX.Element => (
          <Link to={`/employees/${props.cell.row.original.id}`}>
            {props.value}
          </Link>
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
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex, sortBy }
  }: FixTypeLater = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 } as FixTypeLater,
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
      autoResetSortBy: false
    } as FixTypeLater,
    useSortBy,
    usePagination
  )

  React.useEffect(() => {
    fetchData({ pageIndex, sortBy })
  }, [fetchData, pageIndex, sortBy])

  return (
    <>
      <table className="table table-sm table-striped" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: FixTypeLater) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: FixTypeLater) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: FixTypeLater) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: FixTypeLater) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan={10000}>Loading...</td>
            ) : (
              <td colSpan={10000}>
                Showing {page.length} of {recordCount} results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="btn btn-primary mr-1"
          onClick={(): void => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          className="btn btn-primary mr-1"
          onClick={(): void => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          className="btn btn-primary mr-1"
          onClick={(): void => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          className="btn btn-primary mr-1"
          onClick={(): void => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e): void => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
      </div>
    </>
  )
}

export default EmployeeTable
