import React from 'react'
import { TaskLogEntry } from '../../types/TaskLogEntry'
import Date from '../DisplayHelpers/FormattedDate'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import TaskOutcome from '../DisplayHelpers/TaskOutcome'
import { FixTypeLater } from '../../types/FixTypeLater'
import { plainToClass } from 'class-transformer'

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {}

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

interface IState {
  taskLogEntries?: TaskLogEntry[]
}

class TaskLogEntryListing extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { taskLogEntries: undefined }
  }

  componentDidMount(): void {
    this.populateData()
  }

  static renderTaskLogEntriesTable(
    taskLogEntries: TaskLogEntry[]
  ): JSX.Element {
    taskLogEntries.reverse()
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Task</th>
            <th>Status</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {taskLogEntries.map(taskLogEntry => (
            <tr key={taskLogEntry.id}>
              <td>
                <Date
                  date={taskLogEntry.createdTs}
                  showLocalTimezone
                  showTime
                />
              </td>
              <td>{taskLogEntry.taskCode}</td>
              <td>
                <TaskOutcome task={taskLogEntry} />
              </td>
              <td>{taskLogEntry.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render(): JSX.Element {
    const contents =
      this.state.taskLogEntries === undefined ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        TaskLogEntryListing.renderTaskLogEntriesTable(this.state.taskLogEntries)
      )

    return (
      <div>
        <h1 id="tabelLabel">Task log</h1>
        {contents}
      </div>
    )
  }

  async populateData(): Promise<void> {
    await requestJSONWithErrorHandler(
      `api/taskLogEntries`,
      'get',
      null,
      'TASK_LOG_ENTRIES_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void =>
        this.setState({
          taskLogEntries: responseJSON.map(t => plainToClass(TaskLogEntry, t))
        })
    )
  }
}

export default TaskLogEntryListing
