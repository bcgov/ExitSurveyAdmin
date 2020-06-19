import React from 'react'

interface IProps ***REMOVED***
  taskOutcomeCode: string
***REMOVED***

const TaskOutcome = (***REMOVED*** taskOutcomeCode ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const color =
    taskOutcomeCode === 'Success'
      ? 'success'
      : taskOutcomeCode === 'Warn'
      ? 'warning'
      : 'danger'
  return (
    <span
      className=***REMOVED***`btn btn-sm TaskOutcome btn-$***REMOVED***color***REMOVED***`***REMOVED***
      style=***REMOVED******REMOVED*** width: '100px' ***REMOVED******REMOVED***
    >
      <strong>***REMOVED***taskOutcomeCode***REMOVED***</strong>
    </span>
  )
***REMOVED***

export default TaskOutcome
