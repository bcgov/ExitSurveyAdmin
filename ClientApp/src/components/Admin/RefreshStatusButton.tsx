import React from 'react'
import SuccessMessage from '../Employees/SuccessMessage'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import { FixTypeLater } from '../../types/FixTypeLater'

interface Props {}

const RefreshStatusButton = (props: Props): JSX.Element => {
  const [successTime, setSuccessTime] = React.useState(0)
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >(undefined)
  const [refreshButtonActive, setRefreshButtonActive] = React.useState(false)

  const reconcileEmployees = React.useCallback(() => {
    setRefreshButtonActive(true)
    requestJSONWithErrorHandler(
      `api/Employees/RefreshEmployeeStatus`,
      'post',
      null,
      'RECONCILIATION_FAILED',
      (response: FixTypeLater): void => {
        setRefreshButtonActive(false)
        setSuccessTime(Date.now())
        setSuccessMessage('The refresh finished.')
      }
    )
  }, [])

  return (
    <ColumnarLabelledText
      helperText="This will update employee statuses from CallWeb, as outlined in step 3 in the information box (employees will be expired)."
      label="Refresh from CallWeb"
      columnClass="col-12 mt-3"
    >
      <button
        className="btn btn-primary mt-2"
        onClick={reconcileEmployees}
        disabled={refreshButtonActive}
      >
        {refreshButtonActive ? 'Refreshing...' : 'Refresh from CallWeb'}
      </button>
      <SuccessMessage
        className="mt-2"
        successTime={successTime}
        successMessage={successMessage}
      />
    </ColumnarLabelledText>
  )
}

export default RefreshStatusButton
