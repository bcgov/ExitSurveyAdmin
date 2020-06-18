import React from 'react'
import { CellProps, Column } from 'react-table'

import { dateOrUndefined } from '../../helpers/dateHelper'
import { TaskLogEntry } from '../../types/TaskLogEntry'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import TaskComment from './TaskComment'
import TaskOutcome from './TaskOutcome'

type TaskLogEntryCellProps = React.PropsWithChildren<
  CellProps<TaskLogEntry, string | undefined>
>

export const taskLogEntryTableColumns = (): Column<TaskLogEntry>[] => [
  {
    Header: 'Date',
    Cell: (props: TaskLogEntryCellProps): JSX.Element => (
      <FormattedDate
        date={dateOrUndefined(props.value as string)}
        showTime
        showLocalTimezone
      />
    ),
    accessor: 'createdTs'
  },
  {
    Header: 'Task',
    accessor: 'taskCode'
  },
  {
    Header: 'Status',
    Cell: (props: TaskLogEntryCellProps): JSX.Element => (
      <TaskOutcome taskOutcomeCode={props.value as string} />
    ),
    accessor: 'taskOutcomeCode'
  },
  {
    Header: 'Comment',
    Cell: (props: TaskLogEntryCellProps): JSX.Element => (
      <TaskComment comment={props.value as string} />
    ),
    accessor: 'comment'
  }
]
