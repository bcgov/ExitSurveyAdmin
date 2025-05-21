import ***REMOVED*** createColumnHelper, ColumnDef ***REMOVED*** from '@tanstack/react-table'

import ***REMOVED*** TaskLogEntry ***REMOVED*** from '../../types/TaskLogEntry'
import FormattedDate from '../DisplayHelpers/FormattedDate'
import TaskComment from './TaskComment'
import TaskOutcome from './TaskOutcome'

const columnHelper = createColumnHelper<TaskLogEntry>()

export const taskLogEntryTableColumns = (): ColumnDef<TaskLogEntry, any>[] => [
  columnHelper.accessor('createdTs', ***REMOVED***
    header: 'Date',
    cell: info => (
      <FormattedDate
        date=***REMOVED***info.getValue() as unknown as Date***REMOVED***
        showTime
        showLocalTimezone
      />
    ),
***REMOVED***),
  columnHelper.accessor('taskCode', ***REMOVED***
    header: 'Task',
***REMOVED***),
  columnHelper.accessor('taskOutcomeCode', ***REMOVED***
    header: 'Status',
    cell: info => <TaskOutcome taskOutcomeCode=***REMOVED***info.getValue() as string***REMOVED*** />,
***REMOVED***),
  columnHelper.accessor('comment', ***REMOVED***
    header: 'Comment',
    cell: info => <TaskComment comment=***REMOVED***info.getValue() as string***REMOVED*** />,
***REMOVED***),
]
