import React, { type JSX } from 'react'
import SuccessMessage from '../Employees/SuccessMessage'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import { FixTypeLater } from '../../types/FixTypeLater'

interface Props { }

const ScheduledLoadAndUpdateButton = (props: Props): JSX.Element => {
  const [successTime, setSuccessTime] = React.useState(0)
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >(undefined)
  const [refreshButtonActive, setRefreshButtonActive] = React.useState(false)

  const reconcileEmployees = React.useCallback(() => {
    setRefreshButtonActive(true)
    requestJSONWithErrorHandler(
      `api/Employees/ScheduledLoadAndUpdate`,
      'post',
      null,
      'RECONCILIATION_FAILED',
      (response: FixTypeLater): void => {
        setRefreshButtonActive(false)
        setSuccessTime(Date.now())
        setSuccessMessage('The scheduled task finished.')
      }
    )
  }, [])

  return (
    <ColumnarLabelledText
      helperText="This will trigger an execution of the daily scheduled task, as outlined in steps 1-4 in the information box."
      label="Run scheduled task"
      columnClass="col-12 mt-3"
    >
      <button
        className="btn btn-primary mt-2"
        onClick={reconcileEmployees}
        disabled={refreshButtonActive}
      >
        {refreshButtonActive ? 'Running...' : 'Run scheduled task'}
      </button>
      <SuccessMessage
        className="mt-2"
        successTime={successTime}
        successMessage={successMessage}
      />
    </ColumnarLabelledText>
  )
}

export default ScheduledLoadAndUpdateButton
