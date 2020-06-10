/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import ***REMOVED*** usePagination, useSortBy, useTable ***REMOVED*** from 'react-table'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ColumnSortIndicator from '../DisplayHelpers/ColumnSortIndicator'
import Pagination from '../DisplayHelpers/Pagination'
import LoadingRow from '../DisplayHelpers/LoadingRow'
import ***REMOVED*** employeeTableColumns ***REMOVED*** from './taskLogEntryTableColumns'
import ***REMOVED*** TaskLogEntry ***REMOVED*** from '../../types/TaskLogEntry'

interface IProps ***REMOVED***
  data: TaskLogEntry[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  recordCount: number
***REMOVED***

const DefaultColumnFilter = (***REMOVED***
  column: ***REMOVED*** filterValue, setFilter ***REMOVED***
***REMOVED***: FixTypeLater): JSX.Element => ***REMOVED***
  return (
    <input
      className="form-control form-control-sm"
      value=***REMOVED***filterValue || ''***REMOVED***
      onChange=***REMOVED***(e: React.ChangeEvent<HTMLInputElement>): void => ***REMOVED***
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
    ***REMOVED******REMOVED***
      placeholder=***REMOVED***`Search$***REMOVED***/*count*/ ''***REMOVED***...`***REMOVED***
    />
  )
***REMOVED***

const TaskLogEntryTable = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** data, fetchData, loading, controlledPageCount, recordCount ***REMOVED*** = props

  const defaultColumn = React.useMemo(
    () => (***REMOVED*** Filter: DefaultColumnFilter ***REMOVED***),
    []
  )
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
      defaultColumn,
      initialState: ***REMOVED*** pageIndex: 0, pageSize: 20 ***REMOVED*** as FixTypeLater,
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
      manualFilters: true,
      defaultCanFilter: true,
      autoResetSortBy: false,
      autoResetFilters: false
  ***REMOVED*** as FixTypeLater,
    useSortBy,
    usePagination
  )

  React.useEffect(() => ***REMOVED***
    fetchData(***REMOVED*** pageIndex, sortBy ***REMOVED***)
***REMOVED*** [fetchData, pageIndex, sortBy])

  return (
    <>
      <table className="table table-sm table-striped mt-3" ***REMOVED***...getTableProps()***REMOVED***>
        <thead>
          ***REMOVED***headerGroups.map((headerGroup: FixTypeLater) => (
            <tr ***REMOVED***...headerGroup.getHeaderGroupProps()***REMOVED***>
              ***REMOVED***headerGroup.headers.map((column: FixTypeLater) => (
                <th ***REMOVED***...column.getHeaderProps()***REMOVED***>
                  <span ***REMOVED***...column.getSortByToggleProps()***REMOVED***>
                    ***REMOVED***column.render('Header')***REMOVED***
                    <ColumnSortIndicator column=***REMOVED***column***REMOVED*** />
                  </span>
                  <div>***REMOVED***column.canFilter ? column.render('Filter') : null***REMOVED***</div>
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

export default TaskLogEntryTable
