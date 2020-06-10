import React from 'react'
import ***REMOVED*** CSVLink ***REMOVED*** from 'react-csv'

import ***REMOVED*** Employee ***REMOVED*** from '../../types/Employee'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** classToPlain, plainToClass ***REMOVED*** from 'class-transformer'

interface IProps ***REMOVED***
  sortQuery: string
  filterQuery: string
***REMOVED***

const MAX_PAGE_SIZE = 1000000

const ExportData = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED*** sortQuery, filterQuery ***REMOVED*** = props

  const [downloadedData, setDownloadedData] = React.useState<FixTypeLater[]>([])
  const csvLinkRef = React.useRef(null)

  const downloadData = React.useCallback((): void => ***REMOVED***
    requestJSONWithErrorHandler(
      `api/employees?pageSize=$***REMOVED***MAX_PAGE_SIZE***REMOVED***$***REMOVED***sortQuery***REMOVED***$***REMOVED***filterQuery***REMOVED***`,
      'get',
      null,
      'EMPLOYEE_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => ***REMOVED***
        setDownloadedData(
          responseJSON.map(e => ***REMOVED***
            delete e.timelineEntries
            return e
        ***REMOVED***)
        )

        // Click the hidden CSVLink
        ;(csvLinkRef.current as FixTypeLater).link.click()
    ***REMOVED***
    )
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
