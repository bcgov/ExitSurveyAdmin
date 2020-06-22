import React, ***REMOVED*** useEffect ***REMOVED*** from 'react'

import './SuccessMessage.scss'
import ***REMOVED*** timeout ***REMOVED*** from '../../helpers/objectHelper'

interface IProps ***REMOVED***
  successTime: number
  className?: string
***REMOVED***

const SuccessMessage = (***REMOVED*** successTime, className ***REMOVED***: IProps): JSX.Element => ***REMOVED***
  // const [successMessage, setSuccessMessage] = React.useState('')
  const [opacity, setOpacity] = React.useState('0')

  useEffect(() => ***REMOVED***
    async function showSuccessMessage(): Promise<void> ***REMOVED***
      setOpacity('1')
      await timeout(2000)
      setOpacity('0')
  ***REMOVED***

    if (successTime !== 0) ***REMOVED***
      showSuccessMessage()
  ***REMOVED***
***REMOVED*** [successTime])

  // useEffect(() => ***REMOVED***
  //   setOpacity(successMessage && successMessage.length > 0 ? '1' : '0')
  // ***REMOVED***, [successMessage])

  return (
    <div
      className=***REMOVED***`SuccessMessage text-success $***REMOVED***className***REMOVED***`***REMOVED***
      style=***REMOVED******REMOVED*** opacity ***REMOVED******REMOVED***
    >
      Success
    </div>
  )
***REMOVED***

export default SuccessMessage
