import React from 'react'

interface IProps {
  pageSize: number
  currentPage: number
  resultCount: number
}

class PaginationLinks extends React.Component<IProps> {
  public render(): JSX.Element {
    const { pageSize, currentPage, resultCount } = this.props

    const firstNum = currentPage * pageSize + 1
    const secondNumBase = firstNum + pageSize - 1
    const secondNum = secondNumBase > resultCount ? resultCount : secondNumBase

    return (
      <div className="PaginationIndicator mr-2">
        <small className="text-muted">
          Showing{' '}
          <strong>
            {firstNum}&ndash;{secondNum}
          </strong>{' '}
          of {resultCount} results
        </small>
      </div>
    )
  }
}

export default PaginationLinks
