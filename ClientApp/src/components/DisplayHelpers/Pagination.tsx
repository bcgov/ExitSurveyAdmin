import React from 'react'

interface IProps {
  gotoPage: (page: number) => void
  previousPage: () => void
  nextPage: () => void
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  pageIndex: number
}

const Pagination = (props: IProps): JSX.Element => {
  const {
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    canPreviousPage,
    canNextPage,
    pageIndex
  } = props
  return (
    <div className="pagination">
      <button
        className="btn btn-primary mr-1"
        onClick={(): void => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {'<<'}
      </button>{' '}
      <button
        className="btn btn-primary mr-1"
        onClick={(): void => previousPage()}
        disabled={!canPreviousPage}
      >
        {'<'}
      </button>{' '}
      <button
        className="btn btn-primary mr-1"
        onClick={(): void => nextPage()}
        disabled={!canNextPage}
      >
        {'>'}
      </button>{' '}
      <button
        className="btn btn-primary mr-1"
        onClick={(): void => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {'>>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e): void => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
    </div>
  )
}

export default Pagination
