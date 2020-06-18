import React from 'react'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** IFilter ***REMOVED*** from '../Filters/FilterClasses/FilterTypes'
import ***REMOVED*** IPresetProps ***REMOVED*** from '../Filters/Presets/IPresetProps'
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
  filters: IFilter[],
  propLocationSearch: string
): string =>
  MasterFilterHandler.extractFromRawQueryString(filters, propLocationSearch)

export interface IGenericListingProps<T extends object> ***REMOVED***
  filterableFields: IFilter[]
  listingPath: string
  modelName: string
  presetComponent?: React.FC<IPresetProps>
  columns: () => FixTypeLater[]
  dataMapper: (responseJSON: FixTypeLater[]) => T[]
  exportedDataMapper: (responseJSON: FixTypeLater[]) => FixTypeLater[]
  pageSize?: number
***REMOVED***

interface IProps<T extends object>
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
  presetComponent
***REMOVED***: IProps<T>): JSX.Element => ***REMOVED***
  const [data, setData] = React.useState<T[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0)
  const [pageIndex, setPageIndex] = React.useState<number>(0)
  const [recordCount, setRecordCount] = React.useState<number>(0)
  const [filterQuery, setFilterQuery] = React.useState<string>(
    extractFilters(filterableFields, location.search)
  )
  const fetchIdRef = React.useRef<number>(0)

  const pageSize = propPageSize || DEFAULT_PAGE_SIZE

  React.useEffect(
    () => setFilterQuery(extractFilters(filterableFields, location.search)),
    [location.search, filterableFields]
  )

  // Called when the table needs new data
  const fetchData = React.useCallback(
    (***REMOVED*** pageIndex, sortBy ***REMOVED***) => ***REMOVED***
      // Give this fetch an ID and set the loading state
      const fetchId = ++fetchIdRef.current
      setLoading(true)

      const sortByQuery = processSorts(sortBy)

      const path = `$***REMOVED***listingPath***REMOVED***?pageSize=$***REMOVED***pageSize***REMOVED***&page=$***REMOVED***pageIndex +
        1***REMOVED***$***REMOVED***sortByQuery***REMOVED***$***REMOVED***filterQuery***REMOVED***`

      if (fetchId === fetchIdRef.current) ***REMOVED***
        requestJSONWithErrorHandler(
          `api/$***REMOVED***path***REMOVED***`,
          'get',
          null,
          'ENTRY_NOT_FOUND',
          (responseJSON: FixTypeLater[], pagination: FixTypeLater): void => ***REMOVED***
            const pageCount = pagination.PageCount
            const recordCount = pagination.RecordCount

            let newPageIndex = pageIndex
            if (newPageIndex > pageCount - 1) ***REMOVED***
              newPageIndex = pageCount - 1
          ***REMOVED***
            setPageIndex(newPageIndex)
            setData(dataMapper(responseJSON))
            setPageCount(pageCount)
            setRecordCount(recordCount)
            setLoading(false)
        ***REMOVED***
        )
    ***REMOVED***
  ***REMOVED***
    [filterQuery, listingPath, pageSize, dataMapper]
  )

  return (
    <>
      <FilterPanel
        modelName="employees"
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
