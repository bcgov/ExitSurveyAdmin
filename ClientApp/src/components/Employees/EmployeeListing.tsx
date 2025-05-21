import ***REMOVED*** plainToInstance ***REMOVED*** from 'class-transformer'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'

import ***REMOVED*** defaultDateFormat ***REMOVED*** from '../../helpers/dateHelper'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** employeeFilters ***REMOVED*** from '../Filters/Presets/FieldSets/employeeFilters'
import ***REMOVED*** employeeTableColumns ***REMOVED*** from './employeeTableColumns'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import EmployeePresets from '../Filters/Presets/EmployeePresets'
import GenericListing from '../Listings/GenericListing'

dayjs.extend(timezone)

const EmployeeListing = (): JSX.Element => ***REMOVED***
  const dataMapperCallback = React.useCallback(
    (responseJSON: FixTypeLater[]): Employee[] =>
      responseJSON.map((e) => plainToInstance(Employee, e)),
    []
  )

  const exportedDataMapperCallback = React.useCallback(
    (responseJSON: FixTypeLater[]): FixTypeLater[] =>
      responseJSON.map((e) => ***REMOVED***
        delete e.timelineEntries
        delete e.currentEmployeeStatus
        e.birthDate = dayjs(e.birthDate).format(defaultDateFormat)
        e.originalHireDate = dayjs(e.originalHireDate).format(defaultDateFormat)
        e.lastDayWorkedDate = dayjs(e.lastDayWorkedDate).format(defaultDateFormat)
        e.effectiveDate = dayjs(e.effectiveDate).format(defaultDateFormat)
        e.leaveDate = dayjs(e.leaveDate).format(defaultDateFormat)
        return e
    ***REMOVED***),
    []
  )

  return (
    <GenericListing
      sortProp=***REMOVED***`&sorts=-modifiedTs`***REMOVED*** // By default, sort by last modified
      modelName="employees"
      filterableFields=***REMOVED***employeeFilters***REMOVED***
      columns=***REMOVED***employeeTableColumns***REMOVED***
      presetComponent=***REMOVED***EmployeePresets***REMOVED***
      listingPath="employees"
      dataMapper=***REMOVED***dataMapperCallback***REMOVED***
      exportedDataMapper=***REMOVED***exportedDataMapperCallback***REMOVED***
    />
  )
***REMOVED***

export default EmployeeListing
