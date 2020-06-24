import React from 'react'
import { plainToClass } from 'class-transformer'
import moment from 'moment'

import { Employee } from '../../types/Employee'
import { employeeFilters } from '../Filters/Presets/FieldSets/employeeFilters'
import { employeeTableColumns } from './employeeTableColumns'
import { FixTypeLater } from '../../types/FixTypeLater'
import EmployeePresets from '../Filters/Presets/EmployeePresets'
import GenericListing from '../Listings/GenericListing'
import { defaultDateFormat } from '../../helpers/dateHelper'

const EmployeeListing = (): JSX.Element => {
  const dataMapperCallback = React.useCallback(
    (responseJSON: FixTypeLater[]): Employee[] =>
      responseJSON.map(e => plainToClass(Employee, e)),
    []
  )

  const exportedDataMapperCallback = React.useCallback(
    (responseJSON: FixTypeLater[]): FixTypeLater[] =>
      responseJSON.map(e => {
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
      }),
    []
  )

  return (
    <GenericListing
      modelName="employees"
      filterableFields={employeeFilters}
      columns={employeeTableColumns}
      presetComponent={EmployeePresets}
      listingPath="employees"
      dataMapper={dataMapperCallback}
      exportedDataMapper={exportedDataMapperCallback}
    />
  )
}

export default EmployeeListing
