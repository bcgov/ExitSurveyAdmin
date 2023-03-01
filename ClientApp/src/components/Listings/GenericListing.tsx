import React, ***REMOVED*** useEffect ***REMOVED*** from 'react'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** Filter ***REMOVED*** from '../Filters/FilterClasses/FilterTypes'
import ***REMOVED*** PresetProps ***REMOVED*** from '../Filters/Presets/PresetProps'
import ***REMOVED*** ITableSort ***REMOVED*** from '../../types/ITableSort'
import ***REMOVED*** MasterFilterHandler ***REMOVED*** from '../Filters/MasterFilterHandler'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ExportData from '../Tables/ExportData'
import FilterPanel from '../Filters/FilterPanel'
import GenericTable from '../Tables/GenericTable'

const DEFAULT_PAGE_SIZE = 20

/** Maps the sortBy array produced by the react-table to a string that can be
used by the server API, of the kind &sorts=Col1,Col2. A minus sign prefixes
a desc sort. If the sortBy array is empty, return the empty string. */
const processSorts = (sortBy: ITableSort[]): string => ***REMOVED***
  return sortBy.length
    ? `&sorts=$***REMOVED***sortBy
        .map((s: FixTypeLater) => `$***REMOVED***s.desc ? '-' : ''***REMOVED***$***REMOVED***s.id***REMOVED***`)
        .join(',')***REMOVED***`
    : ''
***REMOVED***

const extractFilters = (
  filters: Filter[],
  propLocationSearch: string
): string =>
  MasterFilterHandler.extractFromRawQueryString(filters, propLocationSearch)

export interface IGenericListingProps<T extends object> ***REMOVED***
  filterableFields: Filter[]
  listingPath: string
  modelName: string
  presetComponent?: React.FC<PresetProps>
  columns: () => FixTypeLater[]
  dataMapper: (responseJSON: FixTypeLater[]) => T[]
  exportedDataMapper: (responseJSON: FixTypeLater[]) => FixTypeLater[]
  pageSize?: number
  sortProp?: string
***REMOVED***

interface Props<T extends object>
  extends RouteComponentProps,
    IGenericListingProps<T> ***REMOVED******REMOVED***

const GenericListing = <T extends object>(***REMOVED***
  columns,
  dataMapper,
  exportedDataMapper,
  filterableFields,
  listingPath,
  location,
  pageSize: propPageSize,
  presetComponent,
  modelName,
  sortProp,
***REMOVED***: Props<T>): JSX.Element => ***REMOVED***
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
  useEffect(() => ***REMOVED***
    prevFilterQueryRef.current = filterQuery
***REMOVED*** [filterQuery])

  const pageSize = propPageSize || DEFAULT_PAGE_SIZE

  React.useEffect(
    () => setFilterQuery(extractFilters(filterableFields, location.search)),
    [location.search, filterableFields]
  )

  // Called when the table needs new data
  const fetchData = React.useCallback(
    (***REMOVED*** pageIndex, sortBy ***REMOVED***: ***REMOVED*** pageIndex: number; sortBy: FixTypeLater ***REMOVED***) => ***REMOVED***
      // Give this fetch an ID and set the loading state
      const fetchId = ++fetchIdRef.current
      setLoading(true)

      // If there are no sorts from the table, use the passed-in sort prop, if
      // any, and otherwise just use an empty string.
      const sortByQuery = processSorts(sortBy) || sortProp || ''

      // Set page index
      let newPageIndex = pageIndex
      if (filterQuery !== prevFilterQueryRef.current && pageIndex !== 0) ***REMOVED***
        newPageIndex = 0
    ***REMOVED***

      const path = `$***REMOVED***listingPath***REMOVED***?pageSize=$***REMOVED***pageSize***REMOVED***&page=$***REMOVED***
        newPageIndex + 1
    ***REMOVED***$***REMOVED***sortByQuery***REMOVED***$***REMOVED***filterQuery***REMOVED***`

      requestJSONWithErrorHandler(
        `api/$***REMOVED***path***REMOVED***`,
        'get',
        null,
        'ENTRY_NOT_FOUND',
        (responseJSON: FixTypeLater[], pagination: FixTypeLater): void => ***REMOVED***
          const pageCount = pagination.PageCount
          const recordCount = pagination.RecordCount

          if (fetchId === fetchIdRef.current) ***REMOVED***
            setPageIndex(newPageIndex)
            setData(dataMapper(responseJSON))
            setPageCount(pageCount)
            setRecordCount(recordCount)
            setLoading(false)
        ***REMOVED***
      ***REMOVED***
      )
  ***REMOVED***
    [filterQuery, listingPath, pageSize, dataMapper]
  )

  return (
    <>
      <FilterPanel
        modelName=***REMOVED***modelName***REMOVED***
        filterableFields=***REMOVED***filterableFields***REMOVED***
        presetComponent=***REMOVED***presetComponent***REMOVED***
      />
      <GenericTable
        columns=***REMOVED***columns***REMOVED***
        data=***REMOVED***data***REMOVED***
        fetchData=***REMOVED***fetchData***REMOVED***
        loading=***REMOVED***loading***REMOVED***
        controlledPageCount=***REMOVED***pageCount***REMOVED***
        controlledPageIndex=***REMOVED***pageIndex***REMOVED***
        recordCount=***REMOVED***recordCount***REMOVED***
        pageSize=***REMOVED***pageSize***REMOVED***
      />
      <ExportData
        sortQuery=***REMOVED***''***REMOVED***
        filterQuery=***REMOVED***filterQuery***REMOVED***
        listingPath=***REMOVED***listingPath***REMOVED***
        setDownloadedDataCallback=***REMOVED***exportedDataMapper***REMOVED***
      />
    </>
  )
***REMOVED***

export default withRouter(GenericListing)
