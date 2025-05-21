/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { type JSX } from 'react'
import { Link } from 'react-router-dom'

import { FixTypeLater } from '../types/FixTypeLater'
import { getActiveEmployeesFilter } from './Filters/Presets/Buttons/SetActiveEmployees'
import { getPreviousFiscalYearFilter } from '../components/Filters/Presets/Buttons/SetPreviousFiscalYear'
import { getPreviousMonthFilter } from '../components/Filters/Presets/Buttons/SetPreviousMonth'
import { plainToInstance } from 'class-transformer'
import { requestJSONWithErrorHandler } from '../helpers/requestHelpers'
import { TaskLogEntry } from '../types/TaskLogEntry'
import FormattedDate from './DisplayHelpers/FormattedDate'
import IconButton from './DisplayHelpers/Interface/Buttons/IconButton'
import TaskOutcome from './TaskLogEntries/TaskOutcome'

import './Home.scss'

const NUM_TASK_LOG_ENTRIES = 5

const Home = (): JSX.Element => {
  const [taskLogEntryData, setTaskLogEntryData] = React.useState<
    TaskLogEntry[]
  >([])

  React.useEffect((): void => {
    requestJSONWithErrorHandler(
      `api/taskLogEntries?pageSize=${NUM_TASK_LOG_ENTRIES}&sorts=-createdTs`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => {
        setTaskLogEntryData(
          responseJSON.map((t) => plainToInstance(TaskLogEntry, t))
        )
      }
    )
  }, [])

  return (
    <div className="Centered row">
      <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
        <h1 className="text-primary display-4 my-5">
          <i className="fas fa-envelope-open-text me-4"></i>Exit Survey Admin
        </h1>
        <h2>Quick filters</h2>
        <Link
          to={{
            pathname: '/employees',
            search: `&filters=${getActiveEmployeesFilter().encode()}`,
          }}
        >
          <IconButton
            label="Exiting employees"
            iconName="user-check"
            colorType="outline-primary"
            marginClasses="me-3"
            iconMarginClasses="me-2"
          />
        </Link>
        <Link
          to={{
            pathname: '/employees',
            search: `&filters=${getPreviousMonthFilter().encode()}`,
          }}
        >
          <IconButton
            label="Previous month"
            iconName="calendar-minus"
            colorType="outline-primary"
            marginClasses="me-3"
            iconMarginClasses="me-2"
          />
        </Link>
        <Link
          to={{
            pathname: '/employees',
            search: `&filters=${getPreviousFiscalYearFilter().encode()}`,
          }}
        >
          <IconButton
            label="Previous fiscal year"
            iconName="calendar-alt"
            colorType="outline-primary"
            marginClasses="me-3"
            iconMarginClasses="me-2"
          />
        </Link>
        <h2 className="mt-5">Most recent task statuses</h2>
        {taskLogEntryData.length > 0 && (
          <div>
            {taskLogEntryData.map((tle) => (
              <div key={tle.id} className="d-flex align-items-center mb-2">
                <div>
                  <TaskOutcome taskOutcomeCode={tle.taskOutcomeCode!} />
                </div>
                <div className="ms-3 w-25">
                  <strong>{tle.taskCode}</strong>
                </div>
                <div className="ms-3">
                  <FormattedDate
                    date={tle.createdTs}
                    showLocalTimezone
                    customFormat={'ddd, MMMM D, YYYY • HH:mm:ss z'}
                  />
                </div>
              </div>
            ))}
            <div className="mt-3">
              <Link to={{ pathname: '/task-log-entries' }}>
                <IconButton
                  label={'See all'}
                  iconName="arrow-right"
                  colorType="outline-primary"
                  marginClasses="me-2 mt-2"
                  iconMarginClasses="ms-2"
                  iconRight
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
