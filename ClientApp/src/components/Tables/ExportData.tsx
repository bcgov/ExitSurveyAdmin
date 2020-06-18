import React from 'react'
import ***REMOVED*** CSVLink ***REMOVED*** from 'react-csv'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'

interface IProps ***REMOVED***
  sortQuery: string
  filterQuery: string
  listingPath: string
  setDownloadedDataCallback: (responseJSON: FixTypeLater[]) => FixTypeLater[]
***REMOVED***

const MAX_PAGE_SIZE = 1000000

const ExportData = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED***
    sortQuery,
    filterQuery,
    listingPath,
    setDownloadedDataCallback
***REMOVED*** = props

  const [downloadedData, setDownloadedData] = React.useState<FixTypeLater[]>([])
  const csvLinkRef = React.useRef(null)

  const downloadData = React.useCallback((): void => ***REMOVED***
    requestJSONWithErrorHandler(
      `api/$***REMOVED***listingPath***REMOVED***?pageSize=$***REMOVED***MAX_PAGE_SIZE***REMOVED***$***REMOVED***sortQuery***REMOVED***$***REMOVED***filterQuery***REMOVED***`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => ***REMOVED***
        setDownloadedData(setDownloadedDataCallback(responseJSON))

        // Click the hidden CSVLink
        ;(csvLinkRef.current as FixTypeLater).link.click()
    ***REMOVED***
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
***REMOVED*** [sortQuery, filterQuery])

  return (
    <div>
      <button className="btn btn-primary mt-3" onClick=***REMOVED***downloadData***REMOVED***>
        Export data
      </button>
      <CSVLink
        data=***REMOVED***downloadedData***REMOVED***
        filename="ExitSurveyAdminData.csv"
        className="hidden"
        ref=***REMOVED***csvLinkRef***REMOVED***
        target="_blank"
      />
    </div>
  )
***REMOVED***

export default ExportData
