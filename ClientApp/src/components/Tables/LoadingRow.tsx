import React from 'react'

interface IProps {
  loading: boolean
  pageIndex: number
  pageSize: number
  recordCount: number
}

const LoadingRow = ({
  loading,
  pageSize,
  pageIndex,
  recordCount
}: IProps): JSX.Element => {
  const rangeMin = recordCount === 0 ? 0 : pageIndex * pageSize + 1
  const rangeMax = Math.min((pageIndex + 1) * pageSize, recordCount)
  return (
    <tr>
      {loading ? (
        // Use our custom loading state to show a loading indicator
        <td colSpan={10000}>Loading...</td>
      ) : (
        <td colSpan={10000}>
          Showing {rangeMin} to {rangeMax} of {recordCount} results
        </td>
      )}
    </tr>
  )
}

export default LoadingRow
