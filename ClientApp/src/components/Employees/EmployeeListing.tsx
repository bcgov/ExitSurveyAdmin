import React from 'react'

import ***REMOVED*** Employee, IEmployeeJSON ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'
import ExportData from '../DisplayHelpers/ExportData'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router'
import FilterPanel from '../DisplayHelpers/Filters/FilterPanel'
import ***REMOVED*** MasterFilterHandler ***REMOVED*** from '../DisplayHelpers/Filters/MasterFilterHandler'

export interface ISort ***REMOVED***
  id: string
  desc: boolean
***REMOVED***

export interface IFilter ***REMOVED***
  id: string
  value: string
***REMOVED***

/** Maps the sortBy array produced by the react-table to a string that can be
used by the server API, of the kind &sorts=Col1,Col2. A minus sign prefixes
a desc sort. If the sortBy array is empty, return the empty string. */
const processSorts = (sortBy: ISort[]): string => ***REMOVED***
  return sortBy.length
    ? `&sorts=$***REMOVED***sortBy
        .map((s: FixTypeLater) => `$***REMOVED***s.desc ? '-' : ''***REMOVED***$***REMOVED***s.id***REMOVED***`)
        .join(',')***REMOVED***`
    : ''
***REMOVED***

// const extractSortsFromQuery = (queryString: string): ISort[] => ***REMOVED***
//   return queryString.split(',').map(s => ***REMOVED***
//     return s.startsWith('-')
//       ? ***REMOVED***
//           id: s.substring(1), // Strip off the minus sign
//           desc: true
//       ***REMOVED***
//       : ***REMOVED***
//           id: s,
//           desc: false
//       ***REMOVED***
// ***REMOVED***)
// ***REMOVED***

const extractFilters = (props: IProps): string =>
  MasterFilterHandler.extractFromRawQueryString(props.location.search)

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
    extractFilters(props)
  )
  const fetchIdRef = React.useRef<number>(0)

  React.useEffect(() => setFilterQuery(extractFilters(props)), [props.location])

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
          (responseJSON: IEmployeeJSON[], pagination: FixTypeLater): void => ***REMOVED***
            const pageCount = pagination.PageCount
            const recordCount = pagination.RecordCount

            setData(Employee.deserializeArray(responseJSON))
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
      <ExportData sortQuery=***REMOVED***sortQuery***REMOVED*** filterQuery=***REMOVED***filterQuery***REMOVED*** />
    </>
  )
***REMOVED***

export default withRouter(EmployeeListing)
