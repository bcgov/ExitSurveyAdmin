import React from 'react'
import ActiveFilters from './ActiveFilters'
import FilterForm from './FilterForm'

import { IFilter } from '../../Employees/EmployeeListing'
import './FilterPanel.scss'
import FAIcon from '../Interface/Icons/FAIcon'
import IconButton from '../Interface/Buttons/IconButton'

interface IProps {
  onChangeCallback: (filters: IFilter[]) => void
}

const FilterPanel = (props: IProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false)
  const [filters, setFilters] = React.useState<IFilter[]>([])

  const addFilter = React.useCallback((filter: IFilter): void => {
    const filtersClone = [...filters]
    filtersClone.push(filter)
    setFilters(filtersClone)
  }, [])

  const removeFilter = React.useCallback((filter: IFilter): void => {
    const filtersClone = [...filters]
    const index = filtersClone.findIndex(f => f.id === filter.id)
    if (index > -1) filtersClone.splice(index, 1)
    setFilters(filtersClone)
  }, [])

  React.useEffect(() => props.onChangeCallback(filters), [filters])

  const expandedHeight = expanded ? '200px' : '0px'
  const expandButtonText = expanded ? 'Hide' : 'Expand'
  const expandButtonIcon = `caret-circle-${expanded ? 'down' : 'right'}`
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
              <div className="ml-2" style={{ lineHeight: '100%' }}>
                <small>
                  Showing
                  <br />
                  41 of 118
                </small>
              </div>
            </div>
            <div>
              <ActiveFilters filters={filters} />
              {/* <p className="text-muted mb-0">
                  <small>
                    Current filters showing <strong>24</strong> of 118 results
                  </small>
                </p> */}
            </div>
            <div className="ml-auto">
              {expanded && (
                <IconButton
                  iconType="far"
                  iconName={expandButtonIcon}
                  label={`${expandButtonText} filters`}
                  iconRight
                  iconMarginClasses="ml-2"
                  colorType="secondary"
                  classes="NoOutline NoBackground Faded"
                  iconClasses="fa-lg"
                  onClick={(): void => setExpanded(!expanded)}
                />
              )}
              {!expanded && (
                <IconButton
                  iconType="far"
                  iconName={expandButtonIcon}
                  label={`${expandButtonText} filters`}
                  iconRight
                  iconMarginClasses="ml-2"
                  colorType="secondary"
                  classes="NoOutline NoBackground Faded"
                  iconClasses="fa-lg"
                  onClick={(): void => setExpanded(!expanded)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`FilterPanelBody row ${expandedClass}`}
        style={{
          maxHeight: expandedHeight,
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div className="col py-3">
          <FilterForm />
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
