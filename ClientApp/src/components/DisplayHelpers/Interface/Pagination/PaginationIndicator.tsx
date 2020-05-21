import React from 'react'

interface IProps ***REMOVED***
  pageSize: number
  currentPage: number
  resultCount: number
***REMOVED***

class PaginationLinks extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const ***REMOVED*** pageSize, currentPage, resultCount ***REMOVED*** = this.props

    const firstNum = currentPage * pageSize + 1
    const secondNumBase = firstNum + pageSize - 1
    const secondNum = secondNumBase > resultCount ? resultCount : secondNumBase

    return (
      <div className="PaginationIndicator mr-2">
        <small className="text-muted">
          Showing***REMOVED***' '***REMOVED***
          <strong>
            ***REMOVED***firstNum***REMOVED***&ndash;***REMOVED***secondNum***REMOVED***
          </strong>***REMOVED***' '***REMOVED***
          of ***REMOVED***resultCount***REMOVED*** results
        </small>
      </div>
    )
***REMOVED***
***REMOVED***

export default PaginationLinks
