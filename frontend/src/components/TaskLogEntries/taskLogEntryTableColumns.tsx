import { createColumnHelper, ColumnDef } from '@tanstack/react-table'

import { TaskLogEntry } from '../../types/TaskLogEntry'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import TaskComment from './TaskComment'
import TaskOutcome from './TaskOutcome'

const columnHelper = createColumnHelper<TaskLogEntry>()

export const taskLogEntryTableColumns = (): ColumnDef<TaskLogEntry, any>[] => [
  columnHelper.accessor('createdTs', {
    header: 'Date',
    cell: info => (
      <FormattedDate
        date={info.getValue() as unknown as Date}
        showTime
        showLocalTimezone
      />
    ),
  }),
  columnHelper.accessor('taskCode', {
    header: 'Task',
  }),
  columnHelper.accessor('taskOutcomeCode', {
    header: 'Status',
    cell: info => <TaskOutcome taskOutcomeCode={info.getValue() as string} />,
  }),
  columnHelper.accessor('comment', {
    header: 'Comment',
    cell: info => <TaskComment comment={info.getValue() as string} />,
  }),
]
