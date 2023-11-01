import React, { useEffect } from 'react'

import './SuccessMessage.scss'
import { timeout } from '../../helpers/objectHelper'

interface Props {
  successTime: number
  className?: string
  inline?: boolean
  successMessage?: string
}

const SuccessMessage = ({
  successTime,
  className,
  inline,
  successMessage,
}: Props): JSX.Element => {
  const [opacity, setOpacity] = React.useState('0')
  const [display, setDisplay] = React.useState('none')

  useEffect(() => {
    async function showSuccessMessage(): Promise<void> {
      setDisplay(inline ? 'inline' : 'block')
      await timeout(10)
      setOpacity('1')
      await timeout(2000)
      setOpacity('0')
      await timeout(500)
      setDisplay('none')
    }

    if (successTime !== 0) {
      showSuccessMessage()
    }
  }, [successTime, inline])

  return (
    <div
      className={`SuccessMessage text-success ${className}`}
      style={{ opacity, display }}
    >
      <div className="badge badge-success">
        <i className="fas fa-check-circle mr-2" />
        &nbsp;{successMessage || 'Success'}
      </div>
    </div>
  )
}

export default SuccessMessage
