import React from 'react'
import ActiveFilters from './ActiveFilters'
import FilterForm from './FilterForm'

import ***REMOVED*** IFilter ***REMOVED*** from '../../Employees/EmployeeListing'
import './FilterPanel.scss'
import FAIcon from '../Interface/Icons/FAIcon'
import IconButton from '../Interface/Buttons/IconButton'

interface IProps ***REMOVED***
  onChangeCallback: (filters: IFilter[]) => void
***REMOVED***

const removeIfExists = (arr: IFilter[], candidate: IFilter): void => ***REMOVED***
  const index = arr.findIndex(f => f.id === candidate.id)
  if (index > -1) arr.splice(index, 1)
***REMOVED***

const FilterPanel = (props: IProps): JSX.Element => ***REMOVED***
  const [expanded, setExpanded] = React.useState(true)
  const [filters, setFilters] = React.useState<IFilter[]>([])

  const addFilters = React.useCallback(
    (filtersToAdd: IFilter[]): void => ***REMOVED***
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
    (filter: IFilter): void => ***REMOVED***
      const filtersClone = [...filters]
      removeIfExists(filtersClone, filter)
      setFilters(filtersClone)
  ***REMOVED***
    [filters]
  )

  const resetFilters = React.useCallback((): void => ***REMOVED***
    setFilters([])
***REMOVED*** [filters])

  React.useEffect(() => props.onChangeCallback(filters), [filters])

  const expandedHeight = expanded ? '200px' : '0px'
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
          <FilterForm
            addFilters=***REMOVED***addFilters***REMOVED***
            filters=***REMOVED***filters***REMOVED***
            resetFilters=***REMOVED***resetFilters***REMOVED***
          />
        </div>
      </div>
    </div>
  )
***REMOVED***

export default FilterPanel
