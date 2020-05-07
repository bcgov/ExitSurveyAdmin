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
    <div className="row align-items-center pagination">
      <div className="col">
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
        </button>
      </div>
      <div className="col text-center">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
      </div>
      <div className="col text-right">
        <div className="form-group row mb-0">
          <label className="col-4 col-form-label" htmlFor="GoToPage">
            Go to page
          </label>
          <div className="col-8">
            <input
              id="GoToPage"
              className="form-control form-control-sm"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e): void => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
