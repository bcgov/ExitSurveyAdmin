import ***REMOVED*** type JSX ***REMOVED*** from 'react'

interface Props ***REMOVED***
  taskOutcomeCode: string
***REMOVED***

const TaskOutcome = (***REMOVED*** taskOutcomeCode ***REMOVED***: Props): JSX.Element => ***REMOVED***
  const color =
    taskOutcomeCode === 'Success'
      ? 'bg-success'
      : taskOutcomeCode === 'Warn'
        ? 'bg-warning'
        : 'bg-danger'
  return (
    <span
      className=***REMOVED***`TaskOutcome badge $***REMOVED***color***REMOVED***`***REMOVED***
      style=***REMOVED******REMOVED*** width: '100px' ***REMOVED******REMOVED***
    >
      <strong>***REMOVED***taskOutcomeCode***REMOVED***</strong>
    </span>
  )
***REMOVED***

export default TaskOutcome
