/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** useFilters, usePagination, useSortBy, useTable ***REMOVED*** from 'react-table'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ColumnSortIndicator from '../DisplayHelpers/ColumnSortIndicator'
import Pagination from '../DisplayHelpers/Pagination'
import LoadingRow from '../DisplayHelpers/LoadingRow'
import ***REMOVED*** employeeTableColumns ***REMOVED*** from './employeeTableColumns'

interface IProps ***REMOVED***
  data: Employee[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  recordCount: number
***REMOVED***

const EmployeeTable = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** data, fetchData, loading, controlledPageCount, recordCount ***REMOVED*** = props

  const columns = React.useMemo(employeeTableColumns, [])

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
    state: ***REMOVED*** pageIndex, pageSize, sortBy ***REMOVED***
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
        </tbody>
        <tfoot>
          <LoadingRow
            loading=***REMOVED***loading***REMOVED***
            pageIndex=***REMOVED***pageIndex***REMOVED***
            pageSize=***REMOVED***pageSize***REMOVED***
            recordCount=***REMOVED***recordCount***REMOVED***
          />
        </tfoot>
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
