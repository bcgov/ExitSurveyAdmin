/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** CellProps, Column, usePagination, useTable ***REMOVED*** from 'react-table'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../../helpers/objectHelper'

interface IProps ***REMOVED***
  data: Employee[]
  fetchData: (data: any) => any
  loading: any
  controlledPageCount: number
  recordCount: number
***REMOVED***

type EmployeeCellProps = React.PropsWithChildren<
  CellProps<Employee, string | undefined>
>

const EmployeeTable = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** data, fetchData, loading, controlledPageCount, recordCount ***REMOVED*** = props

  console.log(data)

  // const data = React.useMemo(() => data, [])

  const columns = React.useMemo(
    (): Column<Employee>[] => [
      ***REMOVED***
        Header: 'Telkey',
        accessor: 'telkey'
    ***REMOVED***
      ***REMOVED***
        Header: 'First name',
        Cell: (props: EmployeeCellProps): JSX.Element => (
          <Link to=***REMOVED***`/employees/$***REMOVED***props.value***REMOVED***`***REMOVED***>***REMOVED***props.value***REMOVED***</Link>
        ),
        accessor: 'firstName'
    ***REMOVED***
      ***REMOVED***
        Header: 'Last name',
        Cell: (props: EmployeeCellProps): JSX.Element => (
          <Link to=***REMOVED***`/employees/$***REMOVED***props.value***REMOVED***`***REMOVED***>***REMOVED***props.value***REMOVED***</Link>
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
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: ***REMOVED*** pageIndex, pageSize ***REMOVED***
***REMOVED***: any = useTable(
    ***REMOVED***
      columns,
      data,
      initialState: ***REMOVED*** pageIndex: 0, pageSize: 20 ***REMOVED*** as any, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount
  ***REMOVED*** as any,
    usePagination
  )

  React.useEffect(() => ***REMOVED***
    fetchData(***REMOVED*** pageIndex, pageSize ***REMOVED***)
***REMOVED*** [fetchData, pageIndex, pageSize])

  return (
    <>
      <table className="table table-sm table-striped" ***REMOVED***...getTableProps()***REMOVED***>
        <thead>
          ***REMOVED***headerGroups.map((headerGroup: any) => (
            <tr ***REMOVED***...headerGroup.getHeaderGroupProps()***REMOVED***>
              ***REMOVED***headerGroup.headers.map((column: any) => (
                <th ***REMOVED***...column.getHeaderProps()***REMOVED***>
                  ***REMOVED***column.render('Header')***REMOVED***
                  <span>
                    ***REMOVED***column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''***REMOVED***
                  </span>
                </th>
              ))***REMOVED***
            </tr>
          ))***REMOVED***
        </thead>
        <tbody ***REMOVED***...getTableBodyProps()***REMOVED***>
          ***REMOVED***page.map((row: any, i: number) => ***REMOVED***
            prepareRow(row)
            return (
              <tr ***REMOVED***...row.getRowProps()***REMOVED***>
                ***REMOVED***row.cells.map((cell: any) => ***REMOVED***
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
      <div className="pagination">
        <button
          className="btn btn-primary mr-1"
          onClick=***REMOVED***(): void => gotoPage(0)***REMOVED***
          disabled=***REMOVED***!canPreviousPage***REMOVED***
        >
          ***REMOVED***'<<'***REMOVED***
        </button>***REMOVED***' '***REMOVED***
        <button
          className="btn btn-primary mr-1"
          onClick=***REMOVED***(): void => previousPage()***REMOVED***
          disabled=***REMOVED***!canPreviousPage***REMOVED***
        >
          ***REMOVED***'<'***REMOVED***
        </button>***REMOVED***' '***REMOVED***
        <button
          className="btn btn-primary mr-1"
          onClick=***REMOVED***(): void => nextPage()***REMOVED***
          disabled=***REMOVED***!canNextPage***REMOVED***
        >
          ***REMOVED***'>'***REMOVED***
        </button>***REMOVED***' '***REMOVED***
        <button
          className="btn btn-primary mr-1"
          onClick=***REMOVED***(): void => gotoPage(pageCount - 1)***REMOVED***
          disabled=***REMOVED***!canNextPage***REMOVED***
        >
          ***REMOVED***'>>'***REMOVED***
        </button>***REMOVED***' '***REMOVED***
        <span>
          Page***REMOVED***' '***REMOVED***
          <strong>
            ***REMOVED***pageIndex + 1***REMOVED*** of ***REMOVED***pageOptions.length***REMOVED***
          </strong>***REMOVED***' '***REMOVED***
        </span>
        <span>
          | Go to page:***REMOVED***' '***REMOVED***
          <input
            type="number"
            defaultValue=***REMOVED***pageIndex + 1***REMOVED***
            onChange=***REMOVED***(e): void => ***REMOVED***
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
          ***REMOVED******REMOVED***
            style=***REMOVED******REMOVED*** width: '100px' ***REMOVED******REMOVED***
          />
        </span>***REMOVED***' '***REMOVED***
        ***REMOVED***/* <select
          value=***REMOVED***pageSize***REMOVED***
          onChange=***REMOVED***e => ***REMOVED***
            setPageSize(Number(e.target.value))
        ***REMOVED******REMOVED***
        >
          ***REMOVED***[10, 20, 30, 40, 50].map(pageSize => (
            <option key=***REMOVED***pageSize***REMOVED*** value=***REMOVED***pageSize***REMOVED***>
              Show ***REMOVED***pageSize***REMOVED***
            </option>
          ))***REMOVED***
        </select> */***REMOVED***
      </div>
    </>
  )
***REMOVED***

export default EmployeeTable
