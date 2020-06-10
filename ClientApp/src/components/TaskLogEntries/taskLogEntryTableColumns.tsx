import React from 'react'
import { CellProps, Column } from 'react-table'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import { dateOrUndefined } from '../../helpers/objectHelper'
import { TaskLogEntry } from '../../types/TaskLogEntry'
import TaskOutcome from '../DisplayHelpers/TaskOutcome'

type TaskLogEntryCellProps = React.PropsWithChildren<
  CellProps<TaskLogEntry, string | undefined>
>

export const employeeTableColumns = (): Column<TaskLogEntry>[] => [
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
    accessor: 'comment'
  }
]
