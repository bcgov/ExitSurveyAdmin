import React from 'react'

interface IProps ***REMOVED***
  loading: boolean
  pageIndex: number
  pageSize: number
  recordCount: number
***REMOVED***

const LoadingRow = (***REMOVED***
  loading,
  pageSize,
  pageIndex,
  recordCount
***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const rangeMin = recordCount === 0 ? 0 : pageIndex * pageSize + 1
  const rangeMax = Math.min((pageIndex + 1) * pageSize, recordCount)
  return (
    <tr>
      ***REMOVED***loading ? (
        // Use our custom loading state to show a loading indicator
        <td colSpan=***REMOVED***10000***REMOVED***>Loading...</td>
      ) : (
        <td colSpan=***REMOVED***10000***REMOVED***>
          Showing ***REMOVED***rangeMin***REMOVED*** to ***REMOVED***rangeMax***REMOVED*** of ***REMOVED***recordCount***REMOVED*** results
        </td>
      )***REMOVED***
    </tr>
  )
***REMOVED***

export default LoadingRow
