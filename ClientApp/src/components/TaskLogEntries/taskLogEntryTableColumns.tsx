import React from 'react'
import ***REMOVED*** CellProps, Column ***REMOVED*** from 'react-table'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../../helpers/objectHelper'
import ***REMOVED*** TaskLogEntry ***REMOVED*** from '../../types/TaskLogEntry'
import TaskOutcome from '../DisplayHelpers/TaskOutcome'

type TaskLogEntryCellProps = React.PropsWithChildren<
  CellProps<TaskLogEntry, string | undefined>
>

export const taskLogEntryTableColumns = (): Column<TaskLogEntry>[] => [
  ***REMOVED***
    Header: 'Date',
    Cell: (props: TaskLogEntryCellProps): JSX.Element => (
      <FormattedDate
        date=***REMOVED***dateOrUndefined(props.value as string)***REMOVED***
        showTime
        showLocalTimezone
      />
    ),
    accessor: 'createdTs'
***REMOVED***
  ***REMOVED***
    Header: 'Task',
    accessor: 'taskCode'
***REMOVED***
  ***REMOVED***
    Header: 'Status',
    Cell: (props: TaskLogEntryCellProps): JSX.Element => (
      <TaskOutcome taskOutcomeCode=***REMOVED***props.value as string***REMOVED*** />
    ),
    accessor: 'taskOutcomeCode'
***REMOVED***
  ***REMOVED***
    Header: 'Comment',
    accessor: 'comment'
***REMOVED***
]
