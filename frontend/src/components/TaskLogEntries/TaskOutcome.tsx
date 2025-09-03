import { type JSX } from 'react'

interface Props {
  taskOutcomeCode: string
}

const TaskOutcome = ({ taskOutcomeCode }: Props): JSX.Element => {
  const color =
    taskOutcomeCode === 'Success'
      ? 'bg-success'
      : taskOutcomeCode === 'Warn'
        ? 'bg-warning'
        : 'bg-danger'
  return (
    <span
      className={`TaskOutcome badge ${color}`}
      style={{ width: '100px' }}
    >
      <strong>{taskOutcomeCode}</strong>
    </span>
  )
}

export default TaskOutcome
