/* eslint react/jsx-key: "off" */
// Turn off the jsx-key warning; it goes off because the spread operators used
// by react-table are not obviously supplying the key (but it actually does get
// supplied when rendering in browser).

import React, { type JSX } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table'
import ColumnSortIndicator from './ColumnSortIndicator'
import LoadingRow from './LoadingRow'
import Pagination from './Pagination'

interface Props<T extends object> {
  data: T[]
  columns: () => ColumnDef<T, any>[]
  fetchData: (options: any) => any
  loading: boolean
  controlledPageCount: number
  controlledPageIndex: number
  recordCount: number
  pageSize: number
}

const GenericTable = <T extends object>(props: Props<T>): JSX.Element => {
  const {
    columns: propColumns,
    controlledPageCount,
    controlledPageIndex,
    data,
    fetchData,
    loading,
    pageSize: propPageSize,
    recordCount,
  } = props

  const columns = React.useMemo(propColumns, [propColumns])
  const [pageIndex, setPageIndex] = React.useState(0)
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    pageCount: controlledPageCount,
    state: {
      pagination: { pageIndex, pageSize: propPageSize },
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const next = updater({ pageIndex, pageSize: propPageSize })
        setPageIndex(next.pageIndex)
      } else {
        setPageIndex(updater.pageIndex)
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === 'function') {
        setSorting(updater(sorting))
      } else {
        setSorting(updater)
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  })

  React.useEffect(() => {
    fetchData({ pageIndex, sortBy: sorting })
  }, [fetchData, pageIndex, sorting])

  React.useEffect(() => {
    if (controlledPageIndex !== pageIndex) {
      setPageIndex(controlledPageIndex)
    }
    // Intentionally only looking at controlledPageIndex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledPageIndex])

  return (
    <>
      <Pagination
        gotoPage={table.setPageIndex}
        nextPage={() => table.setPageIndex(pageIndex + 1)}
        previousPage={() => table.setPageIndex(pageIndex - 1)}
        canNextPage={pageIndex < controlledPageCount - 1}
        canPreviousPage={pageIndex > 0}
        pageCount={controlledPageCount}
        pageIndex={pageIndex}
      />
      <table className="table table-sm table-striped">
        <thead>
          <LoadingRow
            loading={loading}
            pageIndex={pageIndex}
            pageSize={propPageSize}
            recordCount={recordCount}
          />
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  <span
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                      style: { cursor: header.column.getCanSort() ? 'pointer' : undefined },
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <ColumnSortIndicator column={header.column} />
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <LoadingRow
            loading={loading}
            pageIndex={pageIndex}
            pageSize={propPageSize}
            recordCount={recordCount}
          />
        </tfoot>
      </table>
      <Pagination
        gotoPage={table.setPageIndex}
        nextPage={() => table.setPageIndex(pageIndex + 1)}
        previousPage={() => table.setPageIndex(pageIndex - 1)}
        canNextPage={pageIndex < controlledPageCount - 1}
        canPreviousPage={pageIndex > 0}
        pageCount={controlledPageCount}
        pageIndex={pageIndex}
      />
    </>
  )
}

export default GenericTable
