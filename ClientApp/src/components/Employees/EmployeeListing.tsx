import React from 'react'

import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** plainToClass ***REMOVED*** from 'class-transformer'
import ***REMOVED*** employeeTableColumns ***REMOVED*** from './employeeTableColumns'
import ***REMOVED*** employeeFilters ***REMOVED*** from '../Filters/Presets/FieldSets/employeeFilters'
import EmployeePresets from '../Filters/Presets/EmployeePresets'
import GenericListing from '../Listings/GenericListing'

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
        return e
    ***REMOVED***)
  ***REMOVED***
  />
)

export default EmployeeListing
