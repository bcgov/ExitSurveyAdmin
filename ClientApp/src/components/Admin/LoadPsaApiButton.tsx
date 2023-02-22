import React from 'react'
import SuccessMessage from '../Employees/SuccessMessage'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'

interface IProps ***REMOVED******REMOVED***

const LoadPsaApiButton = (props: IProps): JSX.Element => ***REMOVED***
  const [successTime, setSuccessTime] = React.useState(0)
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >(undefined)
  const [refreshButtonActive, setRefreshButtonActive] = React.useState(false)

  const reconcileEmployees = React.useCallback(() => ***REMOVED***
    setRefreshButtonActive(true)
    requestJSONWithErrorHandler(
      `api/Employees/FromPsaApi`,
      'post',
      null,
      'RECONCILIATION_FAILED',
      (response: FixTypeLater): void => ***REMOVED***
        setRefreshButtonActive(false)
        setSuccessTime(Date.now())
        setSuccessMessage('The PSA API load process finished.')
    ***REMOVED***
    )
***REMOVED*** [])

  return (
    <ColumnarLabelledText
      helperText="This will connect to the PSA API."
      label="Connect to PSA API"
      columnClass="col-12 mt-3"
    >
      <button
        className="btn btn-primary mt-2"
        onClick=***REMOVED***reconcileEmployees***REMOVED***
        disabled=***REMOVED***refreshButtonActive***REMOVED***
      >
        ***REMOVED***refreshButtonActive ? 'Running...' : 'Run PSA API employee load'***REMOVED***
      </button>
      <SuccessMessage
        className="mt-2"
        successTime=***REMOVED***successTime***REMOVED***
        successMessage=***REMOVED***successMessage***REMOVED***
      />
    </ColumnarLabelledText>
  )
***REMOVED***

export default LoadPsaApiButton
