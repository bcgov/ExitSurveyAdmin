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

const FilterPanel = (props: IProps): JSX.Element => ***REMOVED***
  const [expanded, setExpanded] = React.useState(false)
  const [filters, setFilters] = React.useState<IFilter[]>([])

  const addFilter = React.useCallback((filter: IFilter): void => ***REMOVED***
    const filtersClone = [...filters]
    filtersClone.push(filter)
    setFilters(filtersClone)
***REMOVED*** [])

  const removeFilter = React.useCallback((filter: IFilter): void => ***REMOVED***
    const filtersClone = [...filters]
    const index = filtersClone.findIndex(f => f.id === filter.id)
    if (index > -1) filtersClone.splice(index, 1)
    setFilters(filtersClone)
***REMOVED*** [])

  React.useEffect(() => props.onChangeCallback(filters), [filters])

  const expandedHeight = expanded ? '200px' : '0px'
  const expandButtonText = expanded ? 'Hide' : 'Expand'
  const expandButtonIcon = `caret-circle-$***REMOVED***expanded ? 'down' : 'right'***REMOVED***`
  const expandedClass = expanded ? 'Expanded' : ''

  return (
    <div className="FilterPanel">
      <div className="FilterPanelHeader row py-3">
        <div className="col">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <h2 className="mb-0 text-dark">
                <i className="far fa-filter mr-2"></i>Filter employees
              </h2>
            </div>
            <div className="mr-3 text-muted px-2 py-1 d-flex align-items-center bg-light border">
              <div>
                <FAIcon name="eye" type="far" />
              </div>
              <div className="ml-2" style=***REMOVED******REMOVED*** lineHeight: '100%' ***REMOVED******REMOVED***>
                <small>
                  Showing
                  <br />
                  41 of 118
                </small>
              </div>
            </div>
            <div>
              <ActiveFilters filters=***REMOVED***filters***REMOVED*** />
              ***REMOVED***/* <p className="text-muted mb-0">
                  <small>
                    Current filters showing <strong>24</strong> of 118 results
                  </small>
                </p> */***REMOVED***
            </div>
            <div className="ml-auto">
              ***REMOVED***expanded && (
                <IconButton
                  iconType="far"
                  iconName=***REMOVED***expandButtonIcon***REMOVED***
                  label=***REMOVED***`$***REMOVED***expandButtonText***REMOVED*** filters`***REMOVED***
                  iconRight
                  iconMarginClasses="ml-2"
                  colorType="secondary"
                  classes="NoOutline NoBackground Faded"
                  iconClasses="fa-lg"
                  onClick=***REMOVED***() => setExpanded(!expanded)***REMOVED***
                />
              )***REMOVED***
              ***REMOVED***!expanded && (
                <IconButton
                  iconType="far"
                  iconName=***REMOVED***expandButtonIcon***REMOVED***
                  label=***REMOVED***`$***REMOVED***expandButtonText***REMOVED*** filters`***REMOVED***
                  iconRight
                  iconMarginClasses="ml-2"
                  colorType="secondary"
                  classes="NoOutline NoBackground Faded"
                  iconClasses="fa-lg"
                  onClick=***REMOVED***() => setExpanded(!expanded)***REMOVED***
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
          <FilterForm />
        </div>
      </div>
    </div>
  )
***REMOVED***

export default FilterPanel
