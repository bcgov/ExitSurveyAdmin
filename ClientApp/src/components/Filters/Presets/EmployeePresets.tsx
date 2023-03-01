import React from 'react'

import { PresetProps } from './PresetProps'
import SetActiveEmployees from './Buttons/SetActiveEmployees'
import SetPreviousFiscalYear from './Buttons/SetPreviousFiscalYear'
import SetPreviousMonth from './Buttons/SetPreviousMonth'
import SetBlankEmail from './Buttons/SetBlankEmail'
import Set2MonthsAgo from './Buttons/Set2MonthsAgo'

const EmployeePresets = ({
  submitId,
  setSubmitId,
}: PresetProps): JSX.Element => {
  return (
    <div className="EmployeePresets">
      <p className="mb-1">
        <strong>Predefined filters</strong>
      </p>
      <SetActiveEmployees submitId={submitId} setSubmitId={setSubmitId} />
      <SetPreviousMonth submitId={submitId} setSubmitId={setSubmitId} />
      <Set2MonthsAgo submitId={submitId} setSubmitId={setSubmitId} />
      <SetPreviousFiscalYear submitId={submitId} setSubmitId={setSubmitId} />
      <SetBlankEmail submitId={submitId} setSubmitId={setSubmitId} />
    </div>
  )
}

export default EmployeePresets
