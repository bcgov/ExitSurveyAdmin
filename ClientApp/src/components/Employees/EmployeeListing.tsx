import React from 'react'
import ***REMOVED*** plainToClass ***REMOVED*** from 'class-transformer'
import moment from 'moment'

import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** employeeFilters ***REMOVED*** from '../Filters/Presets/FieldSets/employeeFilters'
import ***REMOVED*** employeeTableColumns ***REMOVED*** from './employeeTableColumns'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import EmployeePresets from '../Filters/Presets/EmployeePresets'
import GenericListing from '../Listings/GenericListing'
import ***REMOVED*** defaultDateFormat ***REMOVED*** from '../../helpers/dateHelper'

const EmployeeListing = (): JSX.Element => (
  <GenericListing
    modelName="employees"
    filterableFields=***REMOVED***employeeFilters***REMOVED***
    columns=***REMOVED***employeeTableColumns***REMOVED***
    presetComponent=***REMOVED***EmployeePresets***REMOVED***
    listingPath="employees"
    dataMapper=***REMOVED***(responseJSON: FixTypeLater[]): Employee[] =>
      responseJSON.map(e => plainToClass(Employee, e))
  ***REMOVED***
    exportedDataMapper=***REMOVED***(responseJSON: FixTypeLater[]): FixTypeLater[] =>
      responseJSON.map(e => ***REMOVED***
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
    ***REMOVED***)
  ***REMOVED***
  />
)

export default EmployeeListing
