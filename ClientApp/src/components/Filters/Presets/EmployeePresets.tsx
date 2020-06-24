import React from 'react'

import ***REMOVED*** IPresetProps ***REMOVED*** from './IPresetProps'
import SetActiveEmployees from './Buttons/SetActiveEmployees'
import SetPreviousFiscalYear from './Buttons/SetPreviousFiscalYear'
import SetPreviousMonth from './Buttons/SetPreviousMonth'
import SetBlankEmail from './Buttons/SetBlankEmail'

const EmployeePresets = (***REMOVED***
  submitId,
  setSubmitId
***REMOVED***: IPresetProps): JSX.Element => ***REMOVED***
  return (
    <div className="EmployeePresets">
      <p className="mb-1">
        <strong>Predefined filters</strong>
      </p>
      <SetActiveEmployees submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <SetPreviousMonth submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <SetPreviousFiscalYear submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <SetBlankEmail submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
    </div>
  )
***REMOVED***

export default EmployeePresets
