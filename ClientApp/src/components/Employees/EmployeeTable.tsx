/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED***
  CellProps,
  Column,
  useFilters,
  usePagination,
  useSortBy,
  useTable
***REMOVED*** from 'react-table'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../../helpers/objectHelper'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ColumnSortIndicator from '../DisplayHelpers/ColumnSortIndicator'
import Pagination from '../DisplayHelpers/Pagination'

interface IProps ***REMOVED***
  data: Employee[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  recordCount: number
***REMOVED***

type EmployeeCellProps = React.PropsWithChildren<
  CellProps<Employee, string | undefined>
>

const EmployeeTable = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** data, fetchData, loading, controlledPageCount, recordCount ***REMOVED*** = props

  const columns = React.useMemo(
    (): Column<Employee>[] => [
      ***REMOVED***
        Header: 'Telkey',
        accessor: 'telkey'
    ***REMOVED***
      ***REMOVED***
        Header: 'First name',
        Cell: (props: EmployeeCellProps): JSX.Element => (
          <Link to=***REMOVED***`/employees/$***REMOVED***props.cell.row.original.id***REMOVED***`***REMOVED***>
            ***REMOVED***props.value***REMOVED***
          </Link>
        ),
        accessor: 'firstName'
    ***REMOVED***
      ***REMOVED***
        Header: 'Last name',
        Cell: (props: EmployeeCellProps): JSX.Element => (
          <Link to=***REMOVED***`/employees/$***REMOVED***props.cell.row.original.id***REMOVED***`***REMOVED***>
            ***REMOVED***props.value***REMOVED***
          </Link>
        ),
        accessor: 'lastName'
    ***REMOVED***
      ***REMOVED***
        Header: 'Email',
        accessor: 'governmentEmail'
    ***REMOVED***
      ***REMOVED***
        Header: 'Classification',
        accessor: 'classification'
    ***REMOVED***
      ***REMOVED***
        Header: 'Leave date',
        Cell: (props: EmployeeCellProps): JSX.Element => (
          <FormattedDate date=***REMOVED***dateOrUndefined(props.value as string)***REMOVED*** />
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
    ],
    []
  )

  const ***REMOVED***
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: ***REMOVED*** pageIndex, sortBy ***REMOVED***
***REMOVED***: FixTypeLater = useTable(
    ***REMOVED***
      columns,
      data,
      initialState: ***REMOVED*** pageIndex: 0, pageSize: 20 ***REMOVED*** as FixTypeLater,
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
      autoResetSortBy: false
  ***REMOVED*** as FixTypeLater,
    useSortBy,
    usePagination
  )

  React.useEffect(() => ***REMOVED***
    fetchData(***REMOVED*** pageIndex, sortBy ***REMOVED***)
***REMOVED*** [fetchData, pageIndex, sortBy])

  return (
    <>
      <table className="table table-sm table-striped" ***REMOVED***...getTableProps()***REMOVED***>
        <thead>
          ***REMOVED***headerGroups.map((headerGroup: FixTypeLater) => (
            <tr ***REMOVED***...headerGroup.getHeaderGroupProps()***REMOVED***>
              ***REMOVED***headerGroup.headers.map((column: FixTypeLater) => (
                <th ***REMOVED***...column.getHeaderProps(column.getSortByToggleProps())***REMOVED***>
                  ***REMOVED***column.render('Header')***REMOVED***
                  <ColumnSortIndicator column=***REMOVED***column***REMOVED*** />
                </th>
              ))***REMOVED***
            </tr>
          ))***REMOVED***
        </thead>
        <tbody ***REMOVED***...getTableBodyProps()***REMOVED***>
          ***REMOVED***page.map((row: FixTypeLater) => ***REMOVED***
            prepareRow(row)
            return (
              <tr ***REMOVED***...row.getRowProps()***REMOVED***>
                ***REMOVED***row.cells.map((cell: FixTypeLater) => ***REMOVED***
                  return <td ***REMOVED***...cell.getCellProps()***REMOVED***>***REMOVED***cell.render('Cell')***REMOVED***</td>
              ***REMOVED***)***REMOVED***
              </tr>
            )
        ***REMOVED***)***REMOVED***
          <tr>
            ***REMOVED***loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan=***REMOVED***10000***REMOVED***>Loading...</td>
            ) : (
              <td colSpan=***REMOVED***10000***REMOVED***>
                Showing ***REMOVED***page.length***REMOVED*** of ***REMOVED***recordCount***REMOVED*** results
              </td>
            )***REMOVED***
          </tr>
        </tbody>
      </table>
      <Pagination
        gotoPage=***REMOVED***gotoPage***REMOVED***
        nextPage=***REMOVED***nextPage***REMOVED***
        previousPage=***REMOVED***previousPage***REMOVED***
        canNextPage=***REMOVED***canNextPage***REMOVED***
        canPreviousPage=***REMOVED***canPreviousPage***REMOVED***
        pageCount=***REMOVED***pageCount***REMOVED***
        pageIndex=***REMOVED***pageIndex***REMOVED***
      />
    </>
  )
***REMOVED***

export default EmployeeTable
