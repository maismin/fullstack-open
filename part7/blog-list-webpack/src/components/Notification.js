import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  if (props.notification.message === null) {
    return null
  }

  return (
    <div className={props.notification.type} data-cy="notification-message">
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification)
