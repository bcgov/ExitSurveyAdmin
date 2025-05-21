import React, { type JSX } from 'react'
import { mkConfig, generateCsv, download } from 'export-to-csv'

import { FixTypeLater } from '../../types/FixTypeLater'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import IconButton from '../DisplayHelpers/Interface/Buttons/IconButton'

const MAX_PAGE_SIZE = 1000000

interface Props {
  sortQuery: string
  filterQuery: string
  listingPath: string
  setDownloadedDataCallback: (responseJSON: FixTypeLater[]) => FixTypeLater[]
}

const ExportData = ({
  filterQuery,
  listingPath,
  setDownloadedDataCallback,
  sortQuery,
}: Props): JSX.Element => {
  const downloadData = React.useCallback((): void => {
    requestJSONWithErrorHandler(
      `api/${listingPath}?pageSize=${MAX_PAGE_SIZE}${sortQuery}${filterQuery}`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => {
        const processedData = setDownloadedDataCallback(responseJSON)

        if (processedData.length > 0) {
          const csvConfig = mkConfig({
            useKeysAsHeaders: true,
            filename: 'ExitSurveyAdminData',
            quoteStrings: true,
          })
          const csv = generateCsv(csvConfig)(processedData)
          download(csvConfig)(csv)
        }
      }
    )
  }, [sortQuery, filterQuery, listingPath, setDownloadedDataCallback])

  return (
    <div>
      <IconButton
        label="Export data"
        iconName="file-export"
        marginClasses="my-3"
        iconMarginClasses="me-2"
        onClick={downloadData}
      />
    </div>
  )
}

export default ExportData
