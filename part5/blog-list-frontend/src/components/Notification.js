import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, classType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classType}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  classType: PropTypes.string.isRequired
}

export default Notification