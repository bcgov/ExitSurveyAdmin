import React from 'react'
import ***REMOVED*** TaskLogEntry ***REMOVED*** from '../../types/TaskLogEntry'

interface IProps ***REMOVED***
  task: TaskLogEntry
***REMOVED***

const TaskOutcome = (***REMOVED*** task ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const color =
    task.taskOutcomeCode === 'Success'
      ? 'success'
      : task.taskOutcomeCode === 'Warn'
      ? 'warning'
      : 'danger'
  return (
    <span className=***REMOVED***`btn TaskOutcome btn-$***REMOVED***color***REMOVED***`***REMOVED***>
      <strong>***REMOVED***task.taskOutcomeCode***REMOVED***</strong>
    </span>
  )
***REMOVED***

export default TaskOutcome
