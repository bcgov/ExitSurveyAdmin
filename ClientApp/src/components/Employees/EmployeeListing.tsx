import React from 'react'

import { Employee, IEmployeeJSON } from '../../types/Employee'
import { FixTypeLater } from '../../types/FixTypeLater'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import EmployeeTable from './EmployeeTable'
import ExportData from '../DisplayHelpers/ExportData'
import { RouteComponentProps, withRouter } from 'react-router'
import FilterPanel from '../DisplayHelpers/Filters/FilterPanel'
import { MasterFilterHandler } from '../DisplayHelpers/Filters/MasterFilterHandler'

export interface ISort {
  id: string
  desc: boolean
}

export interface IFilter {
  id: string
  value: string
}

/** Maps the sortBy array produced by the react-table to a string that can be
used by the server API, of the kind &sorts=Col1,Col2. A minus sign prefixes
a desc sort. If the sortBy array is empty, return the empty string. */
const processSorts = (sortBy: ISort[]): string => {
  return sortBy.length
    ? `&sorts=${sortBy
        .map((s: FixTypeLater) => `${s.desc ? '-' : ''}${s.id}`)
        .join(',')}`
    : ''
}

// const extractSortsFromQuery = (queryString: string): ISort[] => {
//   return queryString.split(',').map(s => {
//     return s.startsWith('-')
//       ? {
//           id: s.substring(1), // Strip off the minus sign
//           desc: true
//         }
//       : {
//           id: s,
//           desc: false
//         }
//   })
// }

const extractFilters = (propLocationSearch: string): string =>
  MasterFilterHandler.extractFromRawQueryString(propLocationSearch)

interface IProps extends RouteComponentProps {}

const EmployeeListing = (props: IProps): JSX.Element => {
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
    ({ pageIndex, sortBy }) => {
      // Give this fetch an ID and set the loading state
      const fetchId = ++fetchIdRef.current
      setLoading(true)

      // Get the sort and filter querystrings for the server call
      setSortQuery(processSorts(sortBy))
      // setFilterQuery(processFilters(filters))

      // console.log(sortBy, sortQuery)
      // console.log(filters, filterQuery)

      const path = `employees?page=${pageIndex + 1}${sortQuery}${filterQuery}`

      if (fetchId === fetchIdRef.current) {
        requestJSONWithErrorHandler(
          `api/${path}`,
          'get',
          null,
          'EMPLOYEE_NOT_FOUND',
          (responseJSON: IEmployeeJSON[], pagination: FixTypeLater): void => {
            const pageCount = pagination.PageCount
            const recordCount = pagination.RecordCount

            setData(Employee.deserializeArray(responseJSON))
            setPageCount(pageCount)
            setRecordCount(recordCount)
            setLoading(false)
          }
        )
      }
    },
    [sortQuery, filterQuery]
  )

  return (
    <>
      <FilterPanel />
      <EmployeeTable
        data={data}
        fetchData={fetchData}
        loading={loading}
        controlledPageCount={pageCount}
        recordCount={recordCount}
      />
      <ExportData sortQuery={sortQuery} filterQuery={filterQuery} />
    </>
  )
}

export default withRouter(EmployeeListing)
