import React from 'react'

import ***REMOVED*** PresetProps ***REMOVED*** from './PresetProps'
import SetActiveEmployees from './Buttons/SetActiveEmployees'
import SetPreviousFiscalYear from './Buttons/SetPreviousFiscalYear'
import SetPreviousMonth from './Buttons/SetPreviousMonth'
import SetBlankEmail from './Buttons/SetBlankEmail'
import Set2MonthsAgo from './Buttons/Set2MonthsAgo'

const EmployeePresets = (***REMOVED***
  submitId,
  setSubmitId,
***REMOVED***: PresetProps): JSX.Element => ***REMOVED***
  return (
    <div className="EmployeePresets">
      <p className="mb-1">
        <strong>Predefined filters</strong>
      </p>
      <SetActiveEmployees submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <SetPreviousMonth submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <Set2MonthsAgo submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <SetPreviousFiscalYear submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <SetBlankEmail submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
    </div>
  )
***REMOVED***

export default EmployeePresets
