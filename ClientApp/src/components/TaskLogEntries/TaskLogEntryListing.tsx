import React from 'react'

import { FixTypeLater } from '../../types/FixTypeLater'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import ExportData from '../DisplayHelpers/ExportData'
import { RouteComponentProps, withRouter } from 'react-router'
// import FilterPanel from '../DisplayHelpers/Filters/FilterPanel'
// import { MasterFilterHandler } from '../DisplayHelpers/Filters/MasterFilterHandler'
import { plainToClass } from 'class-transformer'
import { ITableSort } from '../../types/ReactTable'
import { TaskLogEntry } from '../../types/TaskLogEntry'
import GenericTable from '../DisplayHelpers/GenericTable'
import { taskLogEntryTableColumns } from './taskLogEntryTableColumns'

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

interface IProps extends RouteComponentProps {}

const TaskLogEntryListing = (props: IProps): JSX.Element => {
  // console.log('location -->', props.location)

  // Set up the table with no data to start
  const [data, setData] = React.useState<TaskLogEntry[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageCount, setPageCount] = React.useState<number>(0)
  const [recordCount, setRecordCount] = React.useState<number>(0)
  const [sortQuery, setSortQuery] = React.useState<string>('')
  const [filterQuery, setFilterQuery] = React.useState<string>('')
  const fetchIdRef = React.useRef<number>(0)

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

      const path = `taskLogEntries?page=${pageIndex +
        1}${sortQuery}${filterQuery}`

      if (fetchId === fetchIdRef.current) {
        requestJSONWithErrorHandler(
          `api/${path}`,
          'get',
          null,
          'TASK_LOG_ENTRY_NOT_FOUND',
          (responseJSON: FixTypeLater[], pagination: FixTypeLater): void => {
            const pageCount = pagination.PageCount
            const recordCount = pagination.RecordCount

            setData(responseJSON.map(t => plainToClass(TaskLogEntry, t)))
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
      <h1>Task log entries</h1>
      <GenericTable
        columns={taskLogEntryTableColumns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        controlledPageCount={pageCount}
        recordCount={recordCount}
      />
      <ExportData
        sortQuery={sortQuery}
        filterQuery={filterQuery}
        apiModelName="taskLogEntries"
        setDownloadedDataCallback={(
          responseJSON: FixTypeLater[]
        ): FixTypeLater[] =>
          responseJSON.map(t => {
            delete t.task
            delete t.taskOutcome
            return t
          })
        }
      />
    </>
  )
}

export default withRouter(TaskLogEntryListing)
