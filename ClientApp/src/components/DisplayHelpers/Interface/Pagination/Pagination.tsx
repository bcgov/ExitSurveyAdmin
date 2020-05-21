import React from 'react'

import PaginationLinks from '../Pagination/PaginationLinks'
import PaginationIndicator from '../Pagination/PaginationIndicator'

interface IProps ***REMOVED******REMOVED***

export default class Pagination extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const pageSize = 20
    const currentPage = 0
    const resultCount = 41
    return (
      <div className="Pagination d-flex align-items-center text-right">
        <PaginationIndicator
          pageSize=***REMOVED***pageSize***REMOVED***
          currentPage=***REMOVED***currentPage***REMOVED***
          resultCount=***REMOVED***resultCount***REMOVED***
        />
        <PaginationLinks
          pageSize=***REMOVED***pageSize***REMOVED***
          currentPage=***REMOVED***currentPage***REMOVED***
          resultCount=***REMOVED***resultCount***REMOVED***
        />
      </div>
    )
***REMOVED***
***REMOVED***
