import React, ***REMOVED*** type JSX ***REMOVED*** from 'react'

import './LabelledItem.scss'

interface Props ***REMOVED***
  children: React.ReactNode
***REMOVED***

export default class LabelledSelect extends React.Component<Props> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    return <div className="LabelledItem form-group">***REMOVED***this.props.children***REMOVED***</div>
***REMOVED***
***REMOVED***
