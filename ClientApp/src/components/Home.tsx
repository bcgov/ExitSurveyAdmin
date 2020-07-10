/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom'

import ***REMOVED*** getActiveEmployeesFilter ***REMOVED*** from './Filters/Presets/Buttons/SetActiveEmployees'
import ***REMOVED*** getPreviousMonthFilter ***REMOVED*** from '../components/Filters/Presets/Buttons/SetPreviousMonth'
import ***REMOVED*** getPreviousFiscalYearFilter ***REMOVED*** from '../components/Filters/Presets/Buttons/SetPreviousFiscalYear'

import './Home.scss'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../helpers/requestHelpers'
import ***REMOVED*** TaskLogEntry ***REMOVED*** from '../types/TaskLogEntry'
import ***REMOVED*** plainToClass ***REMOVED*** from 'class-transformer'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../types/FixTypeLater'
import TaskOutcome from './TaskLogEntries/TaskOutcome'
import IconButton from './DisplayHelpers/Interface/Buttons/IconButton'
import FormattedDate from './DisplayHelpers/FormattedDate'

const NUM_TASK_LOG_ENTRIES = 5

const Home = (): JSX.Element => ***REMOVED***
  const [taskLogEntryData, setTaskLogEntryData] = React.useState<
    TaskLogEntry[]
  >([])

  React.useEffect((): void => ***REMOVED***
    requestJSONWithErrorHandler(
      `api/taskLogEntries?pageSize=$***REMOVED***NUM_TASK_LOG_ENTRIES***REMOVED***&sorts=-createdTs`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => ***REMOVED***
        setTaskLogEntryData(
          responseJSON.map(t => plainToClass(TaskLogEntry, t))
        )
    ***REMOVED***
    )
***REMOVED*** [])

  return (
    <div className="Centered row">
      <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
        <h1 className="text-primary display-4 my-5">
          <i className="fas fa-envelope-open-text mr-4"></i>Exit Survey Admin
        </h1>
        <h2>Quick filters</h2>
        <Link
          to=***REMOVED******REMOVED***
            pathname: '/employees',
            search: `&filters=$***REMOVED***getActiveEmployeesFilter().encode()***REMOVED***`
        ***REMOVED******REMOVED***
        >
          <IconButton
            label="Exiting employees"
            iconName="user-check"
            colorType="outline-primary"
            marginClasses="mr-3"
            iconMarginClasses="mr-2"
          />
        </Link>
        <Link
          to=***REMOVED******REMOVED***
            pathname: '/employees',
            search: `&filters=$***REMOVED***getPreviousMonthFilter().encode()***REMOVED***`
        ***REMOVED******REMOVED***
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
          to=***REMOVED******REMOVED***
            pathname: '/employees',
            search: `&filters=$***REMOVED***getPreviousFiscalYearFilter().encode()***REMOVED***`
        ***REMOVED******REMOVED***
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
        ***REMOVED***taskLogEntryData.length > 0 && (
          <div>
            ***REMOVED***taskLogEntryData.map(tle => (
              <div key=***REMOVED***tle.id***REMOVED*** className="d-flex align-items-center mb-2">
                <div>
                  <TaskOutcome taskOutcomeCode=***REMOVED***tle.taskOutcomeCode!***REMOVED*** />
                </div>
                <div className="ml-3">
                  <FormattedDate
                    date=***REMOVED***tle.createdTs***REMOVED***
                    showLocalTimezone
                    customFormat=***REMOVED***'ddd, MMMM D, YYYY • hh:mm:ss z'***REMOVED***
                  />
                </div>
              </div>
            ))***REMOVED***
            <div className="mt-3">
              <Link to=***REMOVED******REMOVED*** pathname: '/task-log-entries' ***REMOVED******REMOVED***>
                <IconButton
                  label=***REMOVED***'See all'***REMOVED***
                  iconName="arrow-right"
                  colorType="outline-primary"
                  marginClasses="mr-2 mt-2"
                  iconMarginClasses="ml-2"
                  iconRight
                />
              </Link>
            </div>
          </div>
        )***REMOVED***
      </div>
    </div>
  )
***REMOVED***

export default Home
