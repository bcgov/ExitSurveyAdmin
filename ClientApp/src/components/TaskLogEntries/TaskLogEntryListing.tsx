import React from 'react'

import { FixTypeLater } from '../../types/FixTypeLater'
import { plainToClass } from 'class-transformer'
import { TaskLogEntry } from '../../types/TaskLogEntry'
import { taskLogEntryTableColumns } from './taskLogEntryTableColumns'
import { taskLogEntryFilters } from '../Filters/Presets/FieldSets/taskLogEntryFilters'
import GenericListing from '../Listings/GenericListing'

const TaskLogEntryListing = (): JSX.Element => (
  <GenericListing
    modelName="task log entries"
    filterableFields={taskLogEntryFilters}
    columns={taskLogEntryTableColumns}
    listingPath="taskLogEntries"
    pageSize={5}
    dataMapper={(responseJSON: FixTypeLater[]): TaskLogEntry[] =>
      responseJSON.map(t => plainToClass(TaskLogEntry, t))
    }
    exportedDataMapper={(responseJSON: FixTypeLater[]): FixTypeLater[] =>
      responseJSON.map(t => {
        delete t.task
        delete t.taskOutcome
        return t
      })
    }
  />
)

export default TaskLogEntryListing
