import React from 'react'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import TaskLogEntryTable from './TaskLogEntryTable'
import ExportData from '../DisplayHelpers/ExportData'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router'
// import FilterPanel from '../DisplayHelpers/Filters/FilterPanel'
// import ***REMOVED*** MasterFilterHandler ***REMOVED*** from '../DisplayHelpers/Filters/MasterFilterHandler'
import ***REMOVED*** plainToClass ***REMOVED*** from 'class-transformer'
import ***REMOVED*** ITableSort ***REMOVED*** from '../../types/ReactTable'
import ***REMOVED*** TaskLogEntry ***REMOVED*** from '../../types/TaskLogEntry'

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

interface IProps extends RouteComponentProps ***REMOVED******REMOVED***

const TaskLogEntryListing = (props: IProps): JSX.Element => ***REMOVED***
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
    (***REMOVED*** pageIndex, sortBy ***REMOVED***) => ***REMOVED***
      // Give this fetch an ID and set the loading state
      const fetchId = ++fetchIdRef.current
      setLoading(true)

      // Get the sort and filter querystrings for the server call
      setSortQuery(processSorts(sortBy))
      // setFilterQuery(processFilters(filters))

      // console.log(sortBy, sortQuery)
      // console.log(filters, filterQuery)

      const path = `taskLogEntries?page=$***REMOVED***pageIndex +
        1***REMOVED***$***REMOVED***sortQuery***REMOVED***$***REMOVED***filterQuery***REMOVED***`

      if (fetchId === fetchIdRef.current) ***REMOVED***
        requestJSONWithErrorHandler(
          `api/$***REMOVED***path***REMOVED***`,
          'get',
          null,
          'TASK_LOG_ENTRY_NOT_FOUND',
          (responseJSON: FixTypeLater[], pagination: FixTypeLater): void => ***REMOVED***
            const pageCount = pagination.PageCount
            const recordCount = pagination.RecordCount

            setData(responseJSON.map(t => plainToClass(TaskLogEntry, t)))
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
      <h1>Task log entries</h1>
      <TaskLogEntryTable
        data=***REMOVED***data***REMOVED***
        fetchData=***REMOVED***fetchData***REMOVED***
        loading=***REMOVED***loading***REMOVED***
        controlledPageCount=***REMOVED***pageCount***REMOVED***
        recordCount=***REMOVED***recordCount***REMOVED***
      />
      <ExportData
        sortQuery=***REMOVED***sortQuery***REMOVED***
        filterQuery=***REMOVED***filterQuery***REMOVED***
        apiModelName="taskLogEntries"
        setDownloadedDataCallback=***REMOVED***(
          responseJSON: FixTypeLater[]
        ): FixTypeLater[] =>
          responseJSON.map(t => ***REMOVED***
            delete t.task
            delete t.taskOutcome
            return t
        ***REMOVED***)
      ***REMOVED***
      />
    </>
  )
***REMOVED***

export default withRouter(TaskLogEntryListing)
