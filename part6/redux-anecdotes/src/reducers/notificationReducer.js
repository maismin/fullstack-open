export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

const createNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification: ''
    }
  }
}

const reducer = (state ='', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export default reducer