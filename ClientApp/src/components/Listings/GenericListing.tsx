import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import { FixTypeLater } from '../../types/FixTypeLater'
import { IFilter } from '../Filters/FilterClasses/FilterTypes'
import { IPresetProps } from '../Filters/Presets/IPresetProps'
import { ITableSort } from '../../types/ITableSort'
import { MasterFilterHandler } from '../Filters/MasterFilterHandler'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import ExportData from '../Tables/ExportData'
import FilterPanel from '../Filters/FilterPanel'
import GenericTable from '../Tables/GenericTable'

const DEFAULT_PAGE_SIZE = 20

/** Maps the sortBy array produced by the react-table to a string that can be
used by the server API, of the kind &sorts=Col1,Col2. A minus sign prefixes
a desc sort. If the sortBy array is empty, return the empty string. */
const processSorts = (sortBy: ITableSort[]): string => {
  return sortBy.length
    ? `&sorts=${sortBy
        .map((s: FixTypeLater) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',')}`
    : ''
}

const extractFilters = (
  filters: IFilter[],
  propLocationSearch: string
): string =>
  MasterFilterHandler.extractFromRawQueryString(filters, propLocationSearch)

export interface IGenericListingProps<T extends object> {
  filterableFields: IFilter[]
  listingPath: string
  modelName: string
  presetComponent?: React.FC<IPresetProps>
  columns: () => FixTypeLater[]
  dataMapper: (responseJSON: FixTypeLater[]) => T[]
  exportedDataMapper: (responseJSON: FixTypeLater[]) => FixTypeLater[]
  pageSize?: number
}

interface IProps<T extends object>
  extends RouteComponentProps,
    IGenericListingProps<T> {}

const GenericListing = <T extends object>({
  columns,
  dataMapper,
  exportedDataMapper,
  filterableFields,
  listingPath,
  location,
  pageSize: propPageSize,
  presetComponent,
  modelName
}: IProps<T>): JSX.Element => {
  const [data, setData] = React.useState<T[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0)
  const [pageIndex, setPageIndex] = React.useState<number>(0)
  const [recordCount, setRecordCount] = React.useState<number>(0)
  const [filterQuery, setFilterQuery] = React.useState<string>(
    extractFilters(filterableFields, location.search)
  )
  const fetchIdRef = React.useRef<number>(0)

  // Keep track of the previous value of the filterQuery in a ref
  const prevFilterQueryRef = React.useRef<string>()
  useEffect(() => {
    prevFilterQueryRef.current = filterQuery
  }, [filterQuery])

  const pageSize = propPageSize || DEFAULT_PAGE_SIZE

  React.useEffect(
    () => setFilterQuery(extractFilters(filterableFields, location.search)),
    [location.search, filterableFields]
  )

  // Called when the table needs new data
  const fetchData = React.useCallback(
    ({ pageIndex, sortBy }) => {
      // Give this fetch an ID and set the loading state
      const fetchId = ++fetchIdRef.current
      setLoading(true)

      const sortByQuery = processSorts(sortBy)

      // Set page index
      let newPageIndex = pageIndex
      if (filterQuery !== prevFilterQueryRef.current && pageIndex !== 0) {
        newPageIndex = 0
      }

      const path = `${listingPath}?pageSize=${pageSize}&page=${newPageIndex +
        1}${sortByQuery}${filterQuery}`

      requestJSONWithErrorHandler(
        `api/${path}`,
        'get',
        null,
        'ENTRY_NOT_FOUND',
        (responseJSON: FixTypeLater[], pagination: FixTypeLater): void => {
          const pageCount = pagination.PageCount
          const recordCount = pagination.RecordCount

          if (fetchId === fetchIdRef.current) {
            setPageIndex(newPageIndex)
            setData(dataMapper(responseJSON))
            setPageCount(pageCount)
            setRecordCount(recordCount)
            setLoading(false)
          }
        }
      )
    },
    [filterQuery, listingPath, pageSize, dataMapper]
  )

  return (
    <>
      <FilterPanel
        modelName={modelName}
        filterableFields={filterableFields}
        presetComponent={presetComponent}
      />
      <GenericTable
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        controlledPageCount={pageCount}
        controlledPageIndex={pageIndex}
        recordCount={recordCount}
        pageSize={pageSize}
      />
      <ExportData
        sortQuery={''}
        filterQuery={filterQuery}
        listingPath={listingPath}
        setDownloadedDataCallback={exportedDataMapper}
      />
    </>
  )
}

export default withRouter(GenericListing)
