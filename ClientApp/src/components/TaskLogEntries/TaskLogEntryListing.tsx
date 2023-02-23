import React from 'react'
import ***REMOVED*** plainToInstance ***REMOVED*** from 'class-transformer'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** TaskLogEntry ***REMOVED*** from '../../types/TaskLogEntry'
import ***REMOVED*** taskLogEntryFilters ***REMOVED*** from '../Filters/Presets/FieldSets/taskLogEntryFilters'
import ***REMOVED*** taskLogEntryTableColumns ***REMOVED*** from './taskLogEntryTableColumns'
import GenericListing from '../Listings/GenericListing'

const TaskLogEntryListing = (): JSX.Element => (
  <GenericListing
    modelName="task log entries"
    filterableFields=***REMOVED***taskLogEntryFilters***REMOVED***
    columns=***REMOVED***taskLogEntryTableColumns***REMOVED***
    listingPath="taskLogEntries"
    pageSize=***REMOVED***5***REMOVED***
    dataMapper=***REMOVED***(responseJSON: FixTypeLater[]): TaskLogEntry[] =>
      responseJSON.map(t => plainToInstance(TaskLogEntry, t))
  ***REMOVED***
    sortProp=***REMOVED***`&sorts=-createdTs`***REMOVED*** // By default, sort reverse chronologically
    exportedDataMapper=***REMOVED***(responseJSON: FixTypeLater[]): FixTypeLater[] =>
      responseJSON.map(t => ***REMOVED***
        delete t.task
        delete t.taskOutcome
        return t
    ***REMOVED***)
  ***REMOVED***
  />
)

export default TaskLogEntryListing
