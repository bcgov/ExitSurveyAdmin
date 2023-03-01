import React from 'react'

interface Props {
  taskOutcomeCode: string
}

const TaskOutcome = ({ taskOutcomeCode }: Props): JSX.Element => {
  const color =
    taskOutcomeCode === 'Success'
      ? 'success'
      : taskOutcomeCode === 'Warn'
      ? 'warning'
      : 'danger'
  return (
    <span
      className={`TaskOutcome badge badge-${color}`}
      style={{ width: '100px' }}
    >
      <strong>{taskOutcomeCode}</strong>
    </span>
  )
}

export default TaskOutcome
