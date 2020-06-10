import React from 'react'

import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'
import ExportData from '../DisplayHelpers/ExportData'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router'
import FilterPanel from '../DisplayHelpers/Filters/FilterPanel'
import ***REMOVED*** MasterFilterHandler ***REMOVED*** from '../DisplayHelpers/Filters/MasterFilterHandler'
import ***REMOVED*** plainToClass ***REMOVED*** from 'class-transformer'
import ***REMOVED*** ITableSort ***REMOVED*** from '../../types/ReactTable'

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

const extractFilters = (propLocationSearch: string): string =>
  MasterFilterHandler.extractFromRawQueryString(propLocationSearch)

interface IProps extends RouteComponentProps ***REMOVED******REMOVED***

const EmployeeListing = (props: IProps): JSX.Element => ***REMOVED***
  // console.log('location -->', props.location)

  // Set up the table with no data to start
  const [data, setData] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0)
  const [recordCount, setRecordCount] = React.useState<number>(0)
  const [sortQuery, setSortQuery] = React.useState<string>('')
  const [filterQuery, setFilterQuery] = React.useState<string>(
    extractFilters(props.location.search)
  )
  const fetchIdRef = React.useRef<number>(0)

  React.useEffect(() => setFilterQuery(extractFilters(props.location.search)), [
    props.location.search
  ])

  // Called when the table needs new data
  const fetchData = React.useCallback(
    (***REMOVED*** pageIndex, sortBy ***REMOVED***) => ***REMOVED***
      // Give this fetch an ID and set the loading state
      const fetchId = ++fetchIdRef.current
      setLoading(true)

      // Get the sort and filter querystrings for the server call
      setSortQuery(processSorts(sortBy))
      // setFilterQuery(processFilters(filters))

      // console.log(sortBy, sortQuery)
      // console.log(filters, filterQuery)

      const path = `employees?page=$***REMOVED***pageIndex + 1***REMOVED***$***REMOVED***sortQuery***REMOVED***$***REMOVED***filterQuery***REMOVED***`

      if (fetchId === fetchIdRef.current) ***REMOVED***
        requestJSONWithErrorHandler(
          `api/$***REMOVED***path***REMOVED***`,
          'get',
          null,
          'EMPLOYEE_NOT_FOUND',
          (responseJSON: FixTypeLater[], pagination: FixTypeLater): void => ***REMOVED***
            const pageCount = pagination.PageCount
            const recordCount = pagination.RecordCount

            setData(responseJSON.map(e => plainToClass(Employee, e)))
            setPageCount(pageCount)
            setRecordCount(recordCount)
            setLoading(false)
        ***REMOVED***
        )
    ***REMOVED***
  ***REMOVED***
    [sortQuery, filterQuery]
  )

  return (
    <>
      <FilterPanel />
      <EmployeeTable
        data=***REMOVED***data***REMOVED***
        fetchData=***REMOVED***fetchData***REMOVED***
        loading=***REMOVED***loading***REMOVED***
        controlledPageCount=***REMOVED***pageCount***REMOVED***
        recordCount=***REMOVED***recordCount***REMOVED***
      />
      <ExportData
        sortQuery=***REMOVED***sortQuery***REMOVED***
        filterQuery=***REMOVED***filterQuery***REMOVED***
        apiModelName="employees"
        setDownloadedDataCallback=***REMOVED***(
          responseJSON: FixTypeLater[]
        ): FixTypeLater[] =>
          responseJSON.map(e => ***REMOVED***
            delete e.timelineEntries
            return e
        ***REMOVED***)
      ***REMOVED***
      />
    </>
  )
***REMOVED***

export default withRouter(EmployeeListing)
