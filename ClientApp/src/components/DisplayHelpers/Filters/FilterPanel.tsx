import React from 'react'
import ActiveFilters from './ActiveFilters'
import FilterForm from './FilterForm'

import './FilterPanel.scss'
import IconButton from '../Interface/Buttons/IconButton'
import ***REMOVED*** IFilterField ***REMOVED*** from './FilterTypes'
import ***REMOVED*** RouteComponentProps, withRouter ***REMOVED*** from 'react-router'
import ***REMOVED*** MasterFilterHandler ***REMOVED*** from './MasterFilterHandler'

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
        // Then push the new filter
        filtersClone.push(newFilter)
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
***REMOVED*** [filters])

  React.useEffect(() => ***REMOVED***
    props.history.push(***REMOVED*** search: MasterFilterHandler.encodeAll(filters) ***REMOVED***)
***REMOVED*** [filters])

  const expandedHeight = expanded ? '400px' : '0px'
  const expandButtonText = expanded ? 'Hide' : 'Expand'
  const expandButtonIcon = `caret-$***REMOVED***expanded ? 'down' : 'right'***REMOVED***`
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
              ***REMOVED***expanded && (
                <IconButton
                  iconType="fas"
                  iconName=***REMOVED***expandButtonIcon***REMOVED***
                  label=***REMOVED***`$***REMOVED***expandButtonText***REMOVED*** filters`***REMOVED***
                  iconRight
                  iconMarginClasses="ml-2"
                  colorType="secondary"
                  classes="NoOutline NoBackground Faded"
                  iconClasses="fa-lg"
                  onClick=***REMOVED***(): void => setExpanded(!expanded)***REMOVED***
                />
              )***REMOVED***
              ***REMOVED***!expanded && (
                <IconButton
                  iconType="fas"
                  iconName=***REMOVED***expandButtonIcon***REMOVED***
                  label=***REMOVED***`$***REMOVED***expandButtonText***REMOVED*** filters`***REMOVED***
                  iconRight
                  iconMarginClasses="ml-2"
                  colorType="secondary"
                  classes="NoOutline NoBackground Faded"
                  iconClasses="fa-lg"
                  onClick=***REMOVED***(): void => setExpanded(!expanded)***REMOVED***
                />
              )***REMOVED***
            </div>
          </div>
        </div>
      </div>
      <div
        className=***REMOVED***`FilterPanelBody row $***REMOVED***expandedClass***REMOVED***`***REMOVED***
        style=***REMOVED******REMOVED***
          maxHeight: expandedHeight,
          overflow: 'hidden',
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
