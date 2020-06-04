import React from 'react'
import { TaskLogEntry } from '../../types/TaskLogEntry'

interface IProps {
  task: TaskLogEntry
}

const TaskOutcome = ({ task }: IProps): JSX.Element => {
  const color =
    task.taskOutcomeCode === 'Success'
      ? 'success'
      : task.taskOutcomeCode === 'Warn'
      ? 'warning'
      : 'danger'
  return (
    <span className={`btn TaskOutcome btn-${color}`}>
      <strong>{task.taskOutcomeCode}</strong>
    </span>
  )
}

export default TaskOutcome
