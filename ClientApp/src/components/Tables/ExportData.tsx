import React from 'react'
import ***REMOVED*** CSVLink ***REMOVED*** from 'react-csv'

import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import IconButton from '../DisplayHelpers/Interface/Buttons/IconButton'

const MAX_PAGE_SIZE = 1000000

interface Props ***REMOVED***
  sortQuery: string
  filterQuery: string
  listingPath: string
  setDownloadedDataCallback: (responseJSON: FixTypeLater[]) => FixTypeLater[]
***REMOVED***

const ExportData = (***REMOVED***
  filterQuery,
  listingPath,
  setDownloadedDataCallback,
  sortQuery,
***REMOVED***: Props): JSX.Element => ***REMOVED***
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
          ; (csvLinkRef.current as FixTypeLater).link.click()
    ***REMOVED***
    )
***REMOVED*** [sortQuery, filterQuery, listingPath, setDownloadedDataCallback])

  return (
    <div>
      <IconButton
        label="Export data"
        iconName="file-export"
        marginClasses="my-3"
        iconMarginClasses="me-2"
        onClick=***REMOVED***downloadData***REMOVED***
      />
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
