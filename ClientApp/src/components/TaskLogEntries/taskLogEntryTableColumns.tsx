import React from 'react'
import ***REMOVED*** CellProps, Column ***REMOVED*** from 'react-table'

import ***REMOVED*** dateOrUndefined ***REMOVED*** from '../../helpers/dateHelper'
import ***REMOVED*** TaskLogEntry ***REMOVED*** from '../../types/TaskLogEntry'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import TaskComment from './TaskComment'
import TaskOutcome from './TaskOutcome'

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
    Cell: (props: TaskLogEntryCellProps): JSX.Element => (
      <TaskComment comment=***REMOVED***props.value as string***REMOVED*** />
    ),
    accessor: 'comment'
***REMOVED***
]
