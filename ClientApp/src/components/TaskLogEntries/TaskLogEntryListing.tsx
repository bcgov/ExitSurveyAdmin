import React from 'react'
import ***REMOVED*** ITaskLogEntryJSON, TaskLogEntry ***REMOVED*** from '../../types/TaskLogEntry'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'
import Date from '../DisplayHelpers/FormattedDate'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'

interface IOwnProps ***REMOVED******REMOVED***

interface IStateProps ***REMOVED******REMOVED***

interface IDispatchProps ***REMOVED******REMOVED***

interface IProps extends IOwnProps, IStateProps, IDispatchProps ***REMOVED******REMOVED***

interface IState ***REMOVED***
  taskLogEntries?: TaskLogEntry[]
***REMOVED***

class TaskLogEntryListing extends React.Component<IProps, IState> ***REMOVED***
  constructor(props: IProps) ***REMOVED***
    super(props)
    this.state = ***REMOVED*** taskLogEntries: undefined ***REMOVED***
***REMOVED***

  componentDidMount(): void ***REMOVED***
    this.populateData()
***REMOVED***

  static renderTaskLogEntriesTable(
    taskLogEntries: TaskLogEntry[]
  ): JSX.Element ***REMOVED***
    console.log(taskLogEntries)
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
          ***REMOVED***taskLogEntries.map(taskLogEntry => (
            <tr key=***REMOVED***taskLogEntry.id***REMOVED***>
              <td>
                <Date
                  date=***REMOVED***taskLogEntry.createdTs***REMOVED***
                  showLocalTimezone
                  showTime
                />
              </td>
              <td>***REMOVED***taskLogEntry.taskCode***REMOVED***</td>
              <td>***REMOVED***taskLogEntry.taskOutcomeCode***REMOVED***</td>
              <td>***REMOVED***taskLogEntry.comment***REMOVED***</td>
            </tr>
          ))***REMOVED***
        </tbody>
      </table>
    )
***REMOVED***

  render(): JSX.Element ***REMOVED***
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
        ***REMOVED***contents***REMOVED***
      </div>
    )
***REMOVED***

  async populateData(): Promise<void> ***REMOVED***
    await requestJSONWithErrorHandler(
      `api/taskLogEntries`,
      'get',
      null,
      'TASK_LOG_ENTRIES_NOT_FOUND',
      (responseJSON: ITaskLogEntryJSON[]): void =>
        this.setState(***REMOVED***
          taskLogEntries: TaskLogEntry.deserializeArray(responseJSON)
      ***REMOVED***)
    )
***REMOVED***
***REMOVED***

export default TaskLogEntryListing
