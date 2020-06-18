import React from 'react'

import { FixTypeLater } from '../../types/FixTypeLater'
import { IFilter } from '../Filters/FilterClasses/FilterTypes'
import { IPresetProps } from '../Filters/Presets/IPresetProps'
import { ITableSort } from '../../types/ITableSort'
import { MasterFilterHandler } from '../Filters/MasterFilterHandler'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { RouteComponentProps, withRouter } from 'react-router'
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

const GenericListing = <T extends object>(props: IProps<T>): JSX.Element => {
  const filterableFields = props.filterableFields

  const [data, setData] = React.useState<T[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0)
  const [pageIndex, setPageIndex] = React.useState<number>(0)
  const [recordCount, setRecordCount] = React.useState<number>(0)
  const [filterQuery, setFilterQuery] = React.useState<string>(
    extractFilters(filterableFields, props.location.search)
  )
  const fetchIdRef = React.useRef<number>(0)

  const pageSize = props.pageSize || DEFAULT_PAGE_SIZE

  React.useEffect(
    () =>
      setFilterQuery(extractFilters(filterableFields, props.location.search)),
    [props.location.search, filterableFields]
  )

  // Called when the table needs new data
  const fetchData = React.useCallback(
    ({ pageIndex, sortBy }) => {
      // Give this fetch an ID and set the loading state
      const fetchId = ++fetchIdRef.current
      setLoading(true)

      const sortByQuery = processSorts(sortBy)

      const path = `${props.listingPath}?pageSize=${pageSize}&page=${pageIndex +
        1}${sortByQuery}${filterQuery}`

      if (fetchId === fetchIdRef.current) {
        requestJSONWithErrorHandler(
          `api/${path}`,
          'get',
          null,
          'ENTRY_NOT_FOUND',
          (responseJSON: FixTypeLater[], pagination: FixTypeLater): void => {
            const pageCount = pagination.PageCount
            const recordCount = pagination.RecordCount

            let newPageIndex = pageIndex
            if (newPageIndex > pageCount - 1) {
              // console.log('in here')
              newPageIndex = pageCount - 1
            }
            setPageIndex(newPageIndex)
            setData(props.dataMapper(responseJSON))
            setPageCount(pageCount)
            setRecordCount(recordCount)
            setLoading(false)
          }
        )
      }
    },
    [filterQuery, props.listingPath, pageSize]
  )

  return (
    <>
      <FilterPanel
        modelName="employees"
        filterableFields={filterableFields}
        presetComponent={props.presetComponent}
      />
      <GenericTable
        columns={props.columns}
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
        listingPath={props.listingPath}
        setDownloadedDataCallback={props.exportedDataMapper}
      />
    </>
  )
}

export default withRouter(GenericListing)
