import React from 'react'

import ActiveFilterButton from '../Interface/Buttons/ActiveFilterButton'

import './ActiveFilters.scss'

interface IProps ***REMOVED******REMOVED***

export default class ActiveFilters extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const filters = [
      ***REMOVED*** filter: 'Country', value: 'Canada' ***REMOVED***,
      ***REMOVED*** filter: 'Pub. Year', value: '2007 – 2012' ***REMOVED***
    ].map(f => (
      <ActiveFilterButton key=***REMOVED***f.filter***REMOVED*** filter=***REMOVED***f.filter***REMOVED*** value=***REMOVED***f.value***REMOVED*** />
    ))

    return (
      <div className="ActiveFilters">
        ***REMOVED***/* <h3 className="text-muted mb-0">Active filters</h3> */***REMOVED***
        <div className="Filters mb-0">***REMOVED***filters***REMOVED***</div>
      </div>
    )
***REMOVED***
***REMOVED***
