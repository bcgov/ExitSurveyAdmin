/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React from 'react'
import ***REMOVED*** Column, usePagination, useSortBy, useTable ***REMOVED*** from 'react-table'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ColumnSortIndicator from './ColumnSortIndicator'
import Pagination from './Pagination'
import LoadingRow from './LoadingRow'

interface IProps<T extends object> ***REMOVED***
  data: T[]
  columns: () => Column<T>[]
  fetchData: (options: FixTypeLater) => FixTypeLater
  loading: boolean
  controlledPageCount: number
  controlledPageIndex: number
  recordCount: number
  pageSize: number
***REMOVED***

const GenericTable = <T extends object>(props: IProps<T>): JSX.Element => ***REMOVED***
  const ***REMOVED***
    data,
    fetchData,
    loading,
    controlledPageCount,
    controlledPageIndex,
    recordCount,
    pageSize: propPageSize
***REMOVED*** = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(props.columns, [])
  const initialPageSize = propPageSize

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
      // defaultColumn,
      initialState: ***REMOVED***
        pageIndex: 0,
        pageSize: initialPageSize
    ***REMOVED*** as FixTypeLater,
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

  React.useEffect(() => ***REMOVED***
    if (controlledPageIndex !== pageIndex) ***REMOVED***
      gotoPage(controlledPageIndex)
  ***REMOVED***
***REMOVED*** [controlledPageIndex])

  return (
    <>
      <Pagination
        gotoPage=***REMOVED***gotoPage***REMOVED***
        nextPage=***REMOVED***nextPage***REMOVED***
        previousPage=***REMOVED***previousPage***REMOVED***
        canNextPage=***REMOVED***canNextPage***REMOVED***
        canPreviousPage=***REMOVED***canPreviousPage***REMOVED***
        pageCount=***REMOVED***pageCount***REMOVED***
        pageIndex=***REMOVED***pageIndex***REMOVED***
      />
      <table className="table table-sm table-striped" ***REMOVED***...getTableProps()***REMOVED***>
        <thead>
          <LoadingRow
            loading=***REMOVED***loading***REMOVED***
            pageIndex=***REMOVED***pageIndex***REMOVED***
            pageSize=***REMOVED***pageSize***REMOVED***
            recordCount=***REMOVED***recordCount***REMOVED***
          />
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

export default GenericTable
