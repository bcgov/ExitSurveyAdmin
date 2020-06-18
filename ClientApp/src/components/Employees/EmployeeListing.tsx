import React from 'react'

import { Employee } from '../../types/Employee'
import { FixTypeLater } from '../../types/FixTypeLater'
import { plainToClass } from 'class-transformer'
import { employeeTableColumns } from './employeeTableColumns'
import { employeeFilters } from '../Filters/Presets/FieldSets/employeeFilters'
import EmployeePresets from '../Filters/Presets/EmployeePresets'
import GenericListing from '../Listings/GenericListing'

const EmployeeListing = (): JSX.Element => (
  <GenericListing
    modelName="employees"
    filterableFields={employeeFilters}
    columns={employeeTableColumns}
    presetComponent={EmployeePresets}
    listingPath="employees"
    dataMapper={(responseJSON: FixTypeLater[]): Employee[] =>
      responseJSON.map(e => plainToClass(Employee, e))
    }
    exportedDataMapper={(responseJSON: FixTypeLater[]): FixTypeLater[] =>
      responseJSON.map(e => {
        delete e.timelineEntries
        delete e.currentEmployeeStatus
        return e
      })
    }
  />
)

export default EmployeeListing
