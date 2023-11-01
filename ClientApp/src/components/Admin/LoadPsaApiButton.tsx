import React from 'react'
import SuccessMessage from '../Employees/SuccessMessage'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import { FixTypeLater } from '../../types/FixTypeLater'

interface Props {}

const LoadPsaApiButton = (props: Props): JSX.Element => {
  const [successTime, setSuccessTime] = React.useState(0)
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >(undefined)
  const [refreshButtonActive, setRefreshButtonActive] = React.useState(false)

  const reconcileEmployees = React.useCallback(() => {
    setRefreshButtonActive(true)
    requestJSONWithErrorHandler(
      `api/Employees/FromPsaApi`,
      'post',
      null,
      'RECONCILIATION_FAILED',
      (response: FixTypeLater): void => {
        setRefreshButtonActive(false)
        setSuccessTime(Date.now())
        setSuccessMessage('The PSA API load process finished.')
      }
    )
  }, [])

  return (
    <ColumnarLabelledText
      helperText="This will connect to the PSA API."
      label="Connect to PSA API"
      columnClass="col-12 mt-3"
    >
      <button
        className="btn btn-primary mt-2"
        onClick={reconcileEmployees}
        disabled={refreshButtonActive}
      >
        {refreshButtonActive ? 'Running...' : 'Run PSA API employee load'}
      </button>
      <SuccessMessage
        className="mt-2"
        successTime={successTime}
        successMessage={successMessage}
      />
    </ColumnarLabelledText>
  )
}

export default LoadPsaApiButton
