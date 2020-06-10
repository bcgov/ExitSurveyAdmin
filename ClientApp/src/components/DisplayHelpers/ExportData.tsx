import React from 'react'
import { CSVLink } from 'react-csv'

import { Employee } from '../../types/Employee'
import { FixTypeLater } from '../../types/FixTypeLater'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { classToPlain, plainToClass } from 'class-transformer'

interface IProps {
  sortQuery: string
  filterQuery: string
}

const MAX_PAGE_SIZE = 1000000

const ExportData = (props: IProps): JSX.Element => {
  const { sortQuery, filterQuery } = props

  const [downloadedData, setDownloadedData] = React.useState<FixTypeLater[]>([])
  const csvLinkRef = React.useRef(null)

  const downloadData = React.useCallback((): void => {
    requestJSONWithErrorHandler(
      `api/employees?pageSize=${MAX_PAGE_SIZE}${sortQuery}${filterQuery}`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => {
        setDownloadedData(
          responseJSON.map(e => {
            delete e.timelineEntries
            return e
          })
        )

        // Click the hidden CSVLink
        ;(csvLinkRef.current as FixTypeLater).link.click()
      }
    )
  }, [sortQuery, filterQuery])

  return (
    <div>
      <button className="btn btn-primary mt-3" onClick={downloadData}>
        Export data
      </button>
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
