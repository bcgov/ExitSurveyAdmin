import React from 'react'

const SEPARATOR = ' • '

interface IProps ***REMOVED***
  pageSize: number
  currentPage: number
  resultCount: number
***REMOVED***

class PaginationLinks extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const ***REMOVED*** pageSize, currentPage, resultCount ***REMOVED*** = this.props

    const nums = []

    for (let i = 0; i < resultCount / pageSize; i++) ***REMOVED***
      if (i !== 0) nums.push(SEPARATOR)
      if (currentPage === i) ***REMOVED***
        nums.push(i + 1)
    ***REMOVED*** else ***REMOVED***
        nums.push(
          <a key=***REMOVED***i***REMOVED*** href=***REMOVED***window.location.href***REMOVED***>
            ***REMOVED***i + 1***REMOVED***
          </a>
        )
    ***REMOVED***
  ***REMOVED***

    return <div className="PaginationLinks text-muted">***REMOVED***nums***REMOVED***</div>
***REMOVED***
***REMOVED***

export default PaginationLinks
