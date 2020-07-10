import React, ***REMOVED*** useEffect ***REMOVED*** from 'react'

import './SuccessMessage.scss'
import ***REMOVED*** timeout ***REMOVED*** from '../../helpers/objectHelper'

interface IProps ***REMOVED***
  successTime: number
  className?: string
***REMOVED***

const SuccessMessage = (***REMOVED*** successTime, className ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  const [opacity, setOpacity] = React.useState('0')
  const [display, setDisplay] = React.useState('none')

  useEffect(() => ***REMOVED***
    async function showSuccessMessage(): Promise<void> ***REMOVED***
      setDisplay('block')
      await timeout(10)
      setOpacity('1')
      await timeout(2000)
      setOpacity('0')
      await timeout(500)
      setDisplay('none')
  ***REMOVED***

    if (successTime !== 0) ***REMOVED***
      showSuccessMessage()
  ***REMOVED***
***REMOVED*** [successTime])

  return (
    <div
      className=***REMOVED***`SuccessMessage text-success $***REMOVED***className***REMOVED***`***REMOVED***
      style=***REMOVED******REMOVED*** opacity, display ***REMOVED******REMOVED***
    >
      <div className="badge badge-success">
        <i className="fas fa-check-circle mr-2" />
        &nbsp;Success
      </div>
    </div>
  )
***REMOVED***

export default SuccessMessage
