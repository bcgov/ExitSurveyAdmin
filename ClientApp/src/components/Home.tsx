/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { Link } from 'react-router-dom'

import { getActiveEmployeesFilter } from './Filters/Presets/Buttons/SetActiveEmployees'
import { getPreviousMonthFilter } from '../components/Filters/Presets/Buttons/SetPreviousMonth'
import { getPreviousFiscalYearFilter } from '../components/Filters/Presets/Buttons/SetPreviousFiscalYear'

import './Home.scss'
import { requestJSONWithErrorHandler } from '../helpers/requestHelpers'
import { TaskLogEntry } from '../types/TaskLogEntry'
import { plainToClass } from 'class-transformer'
import { FixTypeLater } from '../types/FixTypeLater'
import TaskOutcome from './TaskLogEntries/TaskOutcome'
import IconButton from './DisplayHelpers/Interface/Buttons/IconButton'
import FormattedDate from './DisplayHelpers/FormattedDate'

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
          responseJSON.map(t => plainToClass(TaskLogEntry, t))
        )
      }
    )
  }, [])

  return (
    <div className="Centered row">
      <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
        <h1 className="text-primary display-4 my-5">
          <i className="fas fa-envelope-open-text mr-4"></i>Exit Survey Admin
        </h1>
        <h2>Quick filters</h2>
        <Link
          to={{
            pathname: '/employees',
            search: `&filters=${getActiveEmployeesFilter().encode()}`
          }}
        >
          <IconButton
            label="Active employees"
            iconName="user-check"
            colorType="outline-primary"
            marginClasses="mr-3"
            iconMarginClasses="mr-2"
          />
        </Link>
        <Link
          to={{
            pathname: '/employees',
            search: `&filters=${getPreviousMonthFilter().encode()}`
          }}
        >
          <IconButton
            label="Previous month"
            iconName="calendar-minus"
            colorType="outline-primary"
            marginClasses="mr-3"
            iconMarginClasses="mr-2"
          />
        </Link>
        <Link
          to={{
            pathname: '/employees',
            search: `&filters=${getPreviousFiscalYearFilter().encode()}`
          }}
        >
          <IconButton
            label="Previous fiscal year"
            iconName="calendar-alt"
            colorType="outline-primary"
            marginClasses="mr-3"
            iconMarginClasses="mr-2"
          />
        </Link>
        <h2 className="mt-5">Most recent task statuses</h2>
        {taskLogEntryData.length > 0 && (
          <div>
            {taskLogEntryData.map(tle => (
              <div key={tle.id} className="d-flex align-items-center mb-2">
                <div>
                  <TaskOutcome taskOutcomeCode={tle.taskOutcomeCode!} />
                </div>
                <div className="ml-3">
                  <FormattedDate
                    date={tle.createdTs}
                    showLocalTimezone
                    customFormat={'ddd, MMMM D, YYYY • hh:mm:ss z'}
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
                  marginClasses="mr-2 mt-2"
                  iconMarginClasses="ml-2"
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
