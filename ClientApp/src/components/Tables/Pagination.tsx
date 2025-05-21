import ***REMOVED*** type JSX ***REMOVED*** from 'react'

import IconButton from '../DisplayHelpers/Interface/Buttons/IconButton'

interface Props ***REMOVED***
  gotoPage: (page: number) => void
  previousPage: () => void
  nextPage: () => void
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  pageIndex: number
***REMOVED***

const Pagination = (props: Props): JSX.Element => ***REMOVED***
  const ***REMOVED***
    canNextPage,
    canPreviousPage,
    gotoPage,
    nextPage,
    pageCount,
    pageIndex,
    previousPage,
***REMOVED*** = props
  return (
    <div className=***REMOVED***`row align-items-center pagination my-3`***REMOVED***>
      <div className="col">
        <IconButton
          iconName="fast-backward"
          buttonClasses=***REMOVED***'btn-sm'***REMOVED***
          onClick=***REMOVED***(): void => gotoPage(0)***REMOVED***
          disabled=***REMOVED***!canPreviousPage***REMOVED***
          marginClasses=***REMOVED***'me-2'***REMOVED***
        />
        <IconButton
          iconName="step-backward"
          buttonClasses=***REMOVED***'btn-sm'***REMOVED***
          onClick=***REMOVED***(): void => previousPage()***REMOVED***
          disabled=***REMOVED***!canPreviousPage***REMOVED***
          marginClasses=***REMOVED***'me-2'***REMOVED***
        />
        <IconButton
          iconName="step-forward"
          buttonClasses=***REMOVED***'btn-sm'***REMOVED***
          onClick=***REMOVED***(): void => nextPage()***REMOVED***
          disabled=***REMOVED***!canNextPage***REMOVED***
          marginClasses=***REMOVED***'me-2'***REMOVED***
        />
        <IconButton
          iconName="fast-forward"
          buttonClasses=***REMOVED***'btn-sm'***REMOVED***
          onClick=***REMOVED***(): void => gotoPage(pageCount - 1)***REMOVED***
          disabled=***REMOVED***!canNextPage***REMOVED***
          marginClasses=***REMOVED***'me-2'***REMOVED***
        />
      </div>
      <div className="col text-center">
        <span>
          Page***REMOVED***' '***REMOVED***
          <strong>
            ***REMOVED***pageCount === 0 ? 0 : pageIndex + 1***REMOVED*** of ***REMOVED***pageCount***REMOVED***
          </strong>***REMOVED***' '***REMOVED***
        </span>
      </div>
      <div className="col text-end">
        <div className="form-group row mb-0">
          <label className="col-4 col-form-label" htmlFor="GoToPage">
            Go to page
          </label>
          <div className="col-8">
            <input
              id="GoToPage"
              className="form-control form-control-sm"
              type="number"
              defaultValue=***REMOVED***pageIndex + 1***REMOVED***
              onChange=***REMOVED***(e): void => ***REMOVED***
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
            ***REMOVED******REMOVED***
              style=***REMOVED******REMOVED*** width: '100px' ***REMOVED******REMOVED***
            />
          </div>
        </div>
      </div>
    </div>
  )
***REMOVED***

export default Pagination
