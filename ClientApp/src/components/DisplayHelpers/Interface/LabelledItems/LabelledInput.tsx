import React from 'react'
import slugify from 'slugify'

import LabelledItem from './LabelledItem'

interface IProps ***REMOVED***
  title: string
  placeholder: string
***REMOVED***

class LabelledInput extends React.Component<IProps> ***REMOVED***
  public render(): JSX.Element ***REMOVED***
    const ***REMOVED*** title, placeholder ***REMOVED*** = this.props
    const id = slugify(title)
    return (
      <LabelledItem>
        <label htmlFor=***REMOVED***id***REMOVED***>***REMOVED***title***REMOVED***</label>
        <input
          id=***REMOVED***id***REMOVED***
          className="form-control"
          type="text"
          placeholder=***REMOVED***`e.g. $***REMOVED***placeholder***REMOVED***`***REMOVED***
        />
      </LabelledItem>
    )
***REMOVED***
***REMOVED***

export default LabelledInput
