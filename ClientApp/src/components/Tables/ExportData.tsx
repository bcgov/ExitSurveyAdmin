import React from 'react'
import { CSVLink } from 'react-csv'

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
  const [downloadedData, setDownloadedData] = React.useState<FixTypeLater[]>([])
  const csvLinkRef = React.useRef(null)

  const downloadData = React.useCallback((): void => {
    requestJSONWithErrorHandler(
      `api/${listingPath}?pageSize=${MAX_PAGE_SIZE}${sortQuery}${filterQuery}`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => {
        setDownloadedData(setDownloadedDataCallback(responseJSON))

        // Click the hidden CSVLink
        ;(csvLinkRef.current as FixTypeLater).link.click()
      }
    )
  }, [sortQuery, filterQuery, listingPath, setDownloadedDataCallback])

  return (
    <div>
      <IconButton
        label="Export data"
        iconName="file-export"
        marginClasses="my-3"
        iconMarginClasses="mr-2"
        onClick={downloadData}
      />
      <CSVLink
        data={downloadedData}
        filename="ExitSurveyAdminData.csv"
        className="hidden"
        ref={csvLinkRef}
        target="_blank"
      />
    </div>
  )
}

export default ExportData
