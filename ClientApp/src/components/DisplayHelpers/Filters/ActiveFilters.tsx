import React from 'react'

import ActiveFilterButton from '../Interface/Buttons/ActiveFilterButton'

import './ActiveFilters.scss'

interface IProps {}

export default class ActiveFilters extends React.Component<IProps> {
  public render(): JSX.Element {
    const filters = [
      { filter: 'Country', value: 'Canada' },
      { filter: 'Pub. Year', value: '2007 – 2012' }
    ].map(f => (
      <ActiveFilterButton key={f.filter} filter={f.filter} value={f.value} />
    ))

    return (
      <div className="ActiveFilters">
        {/* <h3 className="text-muted mb-0">Active filters</h3> */}
        <div className="Filters mb-0">{filters}</div>
      </div>
    )
  }
}
