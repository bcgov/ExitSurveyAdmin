import React, { useEffect } from 'react'

import './SuccessMessage.scss'
import { timeout } from '../../helpers/objectHelper'

interface IProps {
  successTime: number
  className?: string
}

const SuccessMessage = ({ successTime, className }: IProps): JSX.Element => {
  // const [successMessage, setSuccessMessage] = React.useState('')
  const [opacity, setOpacity] = React.useState('0')

  useEffect(() => {
    async function showSuccessMessage(): Promise<void> {
      setOpacity('1')
      await timeout(2000)
      setOpacity('0')
    }

    if (successTime !== 0) {
      showSuccessMessage()
    }
  }, [successTime])

  // useEffect(() => {
  //   setOpacity(successMessage && successMessage.length > 0 ? '1' : '0')
  // }, [successMessage])

  return (
    <div
      className={`SuccessMessage text-success ${className}`}
      style={{ opacity }}
    >
      Success
    </div>
  )
}

export default SuccessMessage
