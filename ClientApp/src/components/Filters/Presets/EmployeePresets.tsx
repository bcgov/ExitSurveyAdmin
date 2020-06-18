import React from 'react'
import SetActiveUsers from './Buttons/SetActiveUsers'
import SetPreviousMonth from './Buttons/SetPreviousMonth'
import SetPreviousFiscalYear from './Buttons/SetPreviousFiscalYear'
import { IPresetProps } from './IPresetProps'

const EmployeePresets = ({
  submitId,
  setSubmitId
}: IPresetProps): JSX.Element => {
  return (
    <div className="EmployeePresets">
      <p className="mb-1">
        <strong>Predefined filters</strong>
      </p>
      <SetActiveUsers submitId={submitId} setSubmitId={setSubmitId} />
      <SetPreviousMonth submitId={submitId} setSubmitId={setSubmitId} />
      <SetPreviousFiscalYear submitId={submitId} setSubmitId={setSubmitId} />
    </div>
  )
}

export default EmployeePresets
