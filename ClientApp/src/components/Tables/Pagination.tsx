import React from 'react'

import IconButton from '../DisplayHelpers/Interface/Buttons/IconButton'

interface IProps {
  gotoPage: (page: number) => void
  previousPage: () => void
  nextPage: () => void
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  pageIndex: number
  className?: string
}

const Pagination = (props: IProps): JSX.Element => {
  const {
    canNextPage,
    canPreviousPage,
    gotoPage,
    nextPage,
    pageCount,
    pageIndex,
    previousPage
  } = props
  return (
    <div className={`row align-items-center pagination my-3`}>
      <div className="col">
        <IconButton
          iconName="fast-backward"
          buttonClasses={'btn-sm'}
          onClick={(): void => gotoPage(0)}
          disabled={!canPreviousPage}
          marginClasses={'mr-2'}
        />
        <IconButton
          iconName="step-backward"
          buttonClasses={'btn-sm'}
          onClick={(): void => previousPage()}
          disabled={!canPreviousPage}
          marginClasses={'mr-2'}
        />
        <IconButton
          iconName="step-forward"
          buttonClasses={'btn-sm'}
          onClick={(): void => nextPage()}
          disabled={!canNextPage}
          marginClasses={'mr-2'}
        />
        <IconButton
          iconName="fast-forward"
          buttonClasses={'btn-sm'}
          onClick={(): void => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          marginClasses={'mr-2'}
        />
      </div>
      <div className="col text-center">
        <span>
          Page{' '}
          <strong>
            {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
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
