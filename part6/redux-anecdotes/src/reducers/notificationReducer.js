export const createNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification
    }
  }
}

const reducer = (state ='test', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export default reducer