import React from 'react'
import Button from './Interface/Buttons/Button'
import FAIcon from './Interface/Icons/FAIcon'

interface IProps {
  comment: string
}

const LONG_COMMENT_LENGTH = 500

const TaskComment = ({ comment }: IProps): JSX.Element => {
  const commentLength = comment.length

  const isLongComment = comment.length >= LONG_COMMENT_LENGTH

  const [isExpanded, setIsExpanded] = React.useState(false)

  const toggleButton = React.useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  const displayComment =
    commentLength < 500 || isExpanded ? comment : comment.slice(0, 500)

  return (
    <div className="TaskComment">
      {displayComment}
      {isLongComment && (
        <div>
          <Button
            onClick={toggleButton}
            marginClasses={'my-2'}
            className="btn-sm"
            colorType="outline-primary"
          >
            {isExpanded ? (
              <>
                <FAIcon name="minus" /> Show less
              </>
            ) : (
              <>
                <FAIcon name="plus" /> Show more
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

export default TaskComment
