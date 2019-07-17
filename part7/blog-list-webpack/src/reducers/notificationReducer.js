export const setMessage = (message, messageType, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        type: messageType,
        message: message
      }
    })
    setTimeout(() => {
      dispatch(clearMessage())
    }, time)
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

const initialMessage = {
  type: '.success',
  message: null
}

const reducer = (state = initialMessage, action) => {
  switch(action.type) {
  case 'SET_MESSAGE':
    return action.data
  case 'CLEAR_MESSAGE':
    return initialMessage
  default:
    return state
  }
}

export default reducer