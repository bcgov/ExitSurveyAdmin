import React from 'react'
import SetActiveUsers from './Buttons/SetActiveUsers'
import SetPreviousMonth from './Buttons/SetPreviousMonth'
import SetPreviousFiscalYear from './Buttons/SetPreviousFiscalYear'
import ***REMOVED*** IPresetProps ***REMOVED*** from './IPresetProps'

const EmployeePresets = (***REMOVED***
  submitId,
  setSubmitId
***REMOVED***: IPresetProps): JSX.Element => ***REMOVED***
  return (
    <div className="EmployeePresets">
      <p className="mb-1">
        <strong>Predefined filters</strong>
      </p>
      <SetActiveUsers submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <SetPreviousMonth submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
      <SetPreviousFiscalYear submitId=***REMOVED***submitId***REMOVED*** setSubmitId=***REMOVED***setSubmitId***REMOVED*** />
    </div>
  )
***REMOVED***

export default EmployeePresets
