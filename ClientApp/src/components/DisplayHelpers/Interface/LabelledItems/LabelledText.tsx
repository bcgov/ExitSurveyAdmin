import React from 'react'

import './LabelledItem.scss'

interface IProps ***REMOVED***
  title: string
  text: React.ReactNode
***REMOVED***

export default class LabelledText extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    return (
      <div className="LabelledItem mb-3">
        <label>***REMOVED***this.props.title***REMOVED***</label>
        <div>***REMOVED***this.props.text***REMOVED***</div>
      </div>
    )
***REMOVED***
***REMOVED***
