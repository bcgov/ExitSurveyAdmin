import React from 'react'

import PaginationLinks from '../Pagination/PaginationLinks'
import PaginationIndicator from '../Pagination/PaginationIndicator'

interface IProps {}

export default class Pagination extends React.Component<IProps> {
  public render(): JSX.Element {
    const pageSize = 20
    const currentPage = 0
    const resultCount = 41
    return (
      <div className="Pagination d-flex align-items-center text-right">
        <PaginationIndicator
          pageSize={pageSize}
          currentPage={currentPage}
          resultCount={resultCount}
        />
        <PaginationLinks
          pageSize={pageSize}
          currentPage={currentPage}
          resultCount={resultCount}
        />
      </div>
    )
  }
}
