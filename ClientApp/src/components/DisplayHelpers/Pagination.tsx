import React from 'react'

interface IProps ***REMOVED***
  gotoPage: (page: number) => void
  previousPage: () => void
  nextPage: () => void
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  pageIndex: number
***REMOVED***

const Pagination = (props: IProps): JSX.Element => ***REMOVED***
  const ***REMOVED***
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    canPreviousPage,
    canNextPage,
    pageIndex
***REMOVED*** = props
  return (
    <div className="pagination">
      <button
        className="btn btn-primary mr-1"
        onClick=***REMOVED***(): void => gotoPage(0)***REMOVED***
        disabled=***REMOVED***!canPreviousPage***REMOVED***
      >
        ***REMOVED***'<<'***REMOVED***
      </button>***REMOVED***' '***REMOVED***
      <button
        className="btn btn-primary mr-1"
        onClick=***REMOVED***(): void => previousPage()***REMOVED***
        disabled=***REMOVED***!canPreviousPage***REMOVED***
      >
        ***REMOVED***'<'***REMOVED***
      </button>***REMOVED***' '***REMOVED***
      <button
        className="btn btn-primary mr-1"
        onClick=***REMOVED***(): void => nextPage()***REMOVED***
        disabled=***REMOVED***!canNextPage***REMOVED***
      >
        ***REMOVED***'>'***REMOVED***
      </button>***REMOVED***' '***REMOVED***
      <button
        className="btn btn-primary mr-1"
        onClick=***REMOVED***(): void => gotoPage(pageCount - 1)***REMOVED***
        disabled=***REMOVED***!canNextPage***REMOVED***
      >
        ***REMOVED***'>>'***REMOVED***
      </button>***REMOVED***' '***REMOVED***
      <span>
        Page***REMOVED***' '***REMOVED***
        <strong>
          ***REMOVED***pageIndex + 1***REMOVED*** of ***REMOVED***pageCount***REMOVED***
        </strong>***REMOVED***' '***REMOVED***
      </span>
      <span>
        | Go to page:***REMOVED***' '***REMOVED***
        <input
          type="number"
          defaultValue=***REMOVED***pageIndex + 1***REMOVED***
          onChange=***REMOVED***(e): void => ***REMOVED***
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
        ***REMOVED******REMOVED***
          style=***REMOVED******REMOVED*** width: '100px' ***REMOVED******REMOVED***
        />
      </span>***REMOVED***' '***REMOVED***
    </div>
  )
***REMOVED***

export default Pagination
