/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'
import ***REMOVED***
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
***REMOVED*** from '@tanstack/react-table'
import ColumnSortIndicator from './ColumnSortIndicator'
import LoadingRow from './LoadingRow'
import Pagination from './Pagination'

interface Props<T extends object> ***REMOVED***
  data: T[]
  columns: () => ColumnDef<T, any>[]
  fetchData: (options: any) => any
  loading: boolean
  controlledPageCount: number
  controlledPageIndex: number
  recordCount: number
  pageSize: number
***REMOVED***

const GenericTable = <T extends object>(props: Props<T>): JSX.Element => ***REMOVED***
  const ***REMOVED***
    columns: propColumns,
    controlledPageCount,
    controlledPageIndex,
    data,
    fetchData,
    loading,
    pageSize: propPageSize,
    recordCount,
***REMOVED*** = props

  const columns = React.useMemo(propColumns, [propColumns])
  const [pageIndex, setPageIndex] = React.useState(0)
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable(***REMOVED***
    data,
    columns,
    pageCount: controlledPageCount,
    state: ***REMOVED***
      pagination: ***REMOVED*** pageIndex, pageSize: propPageSize ***REMOVED***,
      sorting,
  ***REMOVED***
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: (updater) => ***REMOVED***
      if (typeof updater === 'function') ***REMOVED***
        const next = updater(***REMOVED*** pageIndex, pageSize: propPageSize ***REMOVED***)
        setPageIndex(next.pageIndex)
    ***REMOVED*** else ***REMOVED***
        setPageIndex(updater.pageIndex)
    ***REMOVED***
  ***REMOVED***
    onSortingChange: (updater) => ***REMOVED***
      if (typeof updater === 'function') ***REMOVED***
        setSorting(updater(sorting))
    ***REMOVED*** else ***REMOVED***
        setSorting(updater)
    ***REMOVED***
  ***REMOVED***
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
***REMOVED***)

  React.useEffect(() => ***REMOVED***
    fetchData(***REMOVED*** pageIndex, sorting ***REMOVED***)
***REMOVED*** [fetchData, pageIndex, sorting])

  React.useEffect(() => ***REMOVED***
    if (controlledPageIndex !== pageIndex) ***REMOVED***
      setPageIndex(controlledPageIndex)
  ***REMOVED***
    // Intentionally only looking at controlledPageIndex
    // eslint-disable-next-line react-hooks/exhaustive-deps
***REMOVED*** [controlledPageIndex])

  return (
    <>
      <Pagination
        gotoPage=***REMOVED***table.setPageIndex***REMOVED***
        nextPage=***REMOVED***() => table.setPageIndex(pageIndex + 1)***REMOVED***
        previousPage=***REMOVED***() => table.setPageIndex(pageIndex - 1)***REMOVED***
        canNextPage=***REMOVED***pageIndex < controlledPageCount - 1***REMOVED***
        canPreviousPage=***REMOVED***pageIndex > 0***REMOVED***
        pageCount=***REMOVED***controlledPageCount***REMOVED***
        pageIndex=***REMOVED***pageIndex***REMOVED***
      />
      <table className="table table-sm table-striped">
        <thead>
          <LoadingRow
            loading=***REMOVED***loading***REMOVED***
            pageIndex=***REMOVED***pageIndex***REMOVED***
            pageSize=***REMOVED***propPageSize***REMOVED***
            recordCount=***REMOVED***recordCount***REMOVED***
          />
          ***REMOVED***table.getHeaderGroups().map(headerGroup => (
            <tr key=***REMOVED***headerGroup.id***REMOVED***>
              ***REMOVED***headerGroup.headers.map(header => (
                <th key=***REMOVED***header.id***REMOVED*** colSpan=***REMOVED***header.colSpan***REMOVED***>
                  <span
                    ***REMOVED***...***REMOVED***
                      onClick: header.column.getToggleSortingHandler(),
                      style: ***REMOVED*** cursor: header.column.getCanSort() ? 'pointer' : undefined ***REMOVED***,
                  ***REMOVED******REMOVED***
                  >
                    ***REMOVED***flexRender(header.column.columnDef.header, header.getContext())***REMOVED***
                    <ColumnSortIndicator column=***REMOVED***header.column***REMOVED*** />
                  </span>
                </th>
              ))***REMOVED***
            </tr>
          ))***REMOVED***
        </thead>
        <tbody>
          ***REMOVED***table.getRowModel().rows.map(row => (
            <tr key=***REMOVED***row.id***REMOVED***>
              ***REMOVED***row.getVisibleCells().map(cell => (
                <td key=***REMOVED***cell.id***REMOVED***>***REMOVED***flexRender(cell.column.columnDef.cell, cell.getContext())***REMOVED***</td>
              ))***REMOVED***
            </tr>
          ))***REMOVED***
        </tbody>
        <tfoot>
          <LoadingRow
            loading=***REMOVED***loading***REMOVED***
            pageIndex=***REMOVED***pageIndex***REMOVED***
            pageSize=***REMOVED***propPageSize***REMOVED***
            recordCount=***REMOVED***recordCount***REMOVED***
          />
        </tfoot>
      </table>
      <Pagination
        gotoPage=***REMOVED***table.setPageIndex***REMOVED***
        nextPage=***REMOVED***() => table.setPageIndex(pageIndex + 1)***REMOVED***
        previousPage=***REMOVED***() => table.setPageIndex(pageIndex - 1)***REMOVED***
        canNextPage=***REMOVED***pageIndex < controlledPageCount - 1***REMOVED***
        canPreviousPage=***REMOVED***pageIndex > 0***REMOVED***
        pageCount=***REMOVED***controlledPageCount***REMOVED***
        pageIndex=***REMOVED***pageIndex***REMOVED***
      />
    </>
  )
***REMOVED***

export default GenericTable
