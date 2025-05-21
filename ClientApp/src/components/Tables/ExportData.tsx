import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'
import ***REMOVED*** mkConfig, generateCsv, download ***REMOVED*** from 'export-to-csv'

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
  const downloadData = React.useCallback((): void => ***REMOVED***
    requestJSONWithErrorHandler(
      `api/$***REMOVED***listingPath***REMOVED***?pageSize=$***REMOVED***MAX_PAGE_SIZE***REMOVED***$***REMOVED***sortQuery***REMOVED***$***REMOVED***filterQuery***REMOVED***`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => ***REMOVED***
        const processedData = setDownloadedDataCallback(responseJSON)

        if (processedData.length > 0) ***REMOVED***
          const csvConfig = mkConfig(***REMOVED***
            useKeysAsHeaders: true,
            filename: 'ExitSurveyAdminData',
            quoteStrings: true,
        ***REMOVED***)
          const csv = generateCsv(csvConfig)(processedData)
          download(csvConfig)(csv)
      ***REMOVED***
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
    </div>
  )
***REMOVED***

export default ExportData
