import ***REMOVED*** plainToInstance ***REMOVED*** from 'class-transformer'
import moment from 'moment-timezone'
import React from 'react'

import ***REMOVED*** defaultDateFormat ***REMOVED*** from '../../helpers/dateHelper'
import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** employeeFilters ***REMOVED*** from '../Filters/Presets/FieldSets/employeeFilters'
import ***REMOVED*** employeeTableColumns ***REMOVED*** from './employeeTableColumns'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import EmployeePresets from '../Filters/Presets/EmployeePresets'
import GenericListing from '../Listings/GenericListing'

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
        e.birthDate = moment(e.birthDate).format(defaultDateFormat)
        e.originalHireDate = moment(e.originalHireDate).format(
          defaultDateFormat
        )
        e.lastDayWorkedDate = moment(e.lastDayWorkedDate).format(
          defaultDateFormat
        )
        e.effectiveDate = moment(e.effectiveDate).format(defaultDateFormat)
        e.leaveDate = moment(e.leaveDate).format(defaultDateFormat)
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
