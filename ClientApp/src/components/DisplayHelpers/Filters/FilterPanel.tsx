import React from 'react'
import ActiveFilters from './ActiveFilters'
import FilterForm from './FilterForm'

import './FilterPanel.scss'
import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router'
import ***REMOVED*** MasterFilterHandler ***REMOVED*** from './MasterFilterHandler'
import ExpandPanel from '../Interface/Buttons/FilterPanelExpandButton'
import HidePanel from '../Interface/Buttons/FilterPanelHideButton'

interface IProps extends RouteComponentProps ***REMOVED******REMOVED***

const removeIfExists = (arr: IFilterField[], candidate: IFilterField): void => ***REMOVED***
  const index = arr.findIndex(f => f.fieldName === candidate.fieldName)
  if (index > -1) arr.splice(index, 1)
***REMOVED***

const FilterPanel = (props: IProps): JSX.Element => ***REMOVED***
  const [expanded, setExpanded] = React.useState(true)
  const [filters, setFilters] = React.useState<IFilterField[]>(() =>
    MasterFilterHandler.decodeFromQueryString(props.location.search)
  )

  const addFilters = React.useCallback(
    (filtersToAdd: IFilterField[]): void => ***REMOVED***
      const filtersClone = [...filters]

      filtersToAdd.forEach(newFilter => ***REMOVED***
        // If a new filter exists in the existing array, remove it
        removeIfExists(filtersClone, newFilter)
        filtersClone.push(newFilter) // Then push the new filter
    ***REMOVED***)
      setFilters(filtersClone)
  ***REMOVED***
    [filters]
  )

  const removeFilter = React.useCallback(
    (filter: IFilterField): void => ***REMOVED***
      const filtersClone = [...filters]
      removeIfExists(filtersClone, filter)
      setFilters(filtersClone)
  ***REMOVED***
    [filters]
  )

  const resetFilters = React.useCallback((): void => ***REMOVED***
    setFilters([])
***REMOVED*** [])

  React.useEffect(() => ***REMOVED***
    props.history.push(***REMOVED*** search: MasterFilterHandler.encodeAll(filters) ***REMOVED***)
***REMOVED*** [filters, props.history])

  const expandedHeight = expanded ? '400px' : '0px'
  const expandedClass = expanded ? 'Expanded' : ''

  return (
    <div className="FilterPanel">
      <div className="FilterPanelHeader row py-3">
        <div className="col">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <h2 className="mb-0">
                <i className="fas fa-filter mr-2"></i>Filter employees
              </h2>
            </div>
            <div>
              <ActiveFilters filters=***REMOVED***filters***REMOVED*** removeFilter=***REMOVED***removeFilter***REMOVED*** />
            </div>
            <div className="ml-auto">
              ***REMOVED***expanded && <ExpandPanel setExpanded=***REMOVED***setExpanded***REMOVED*** />***REMOVED***
              ***REMOVED***!expanded && <HidePanel setExpanded=***REMOVED***setExpanded***REMOVED*** />***REMOVED***
            </div>
          </div>
        </div>
      </div>
      <div
        className=***REMOVED***`FilterPanelBody row $***REMOVED***expandedClass***REMOVED***`***REMOVED***
        style=***REMOVED******REMOVED***
          maxHeight: expandedHeight,
          boxSizing: 'border-box'
      ***REMOVED******REMOVED***
      >
        <div className="col py-3">
          <FilterForm addFilters=***REMOVED***addFilters***REMOVED*** resetFilters=***REMOVED***resetFilters***REMOVED*** />
        </div>
      </div>
    </div>
  )
***REMOVED***

export default withRouter(FilterPanel)
