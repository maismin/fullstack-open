import blogService from '../services/blogs'

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  let user = null
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
  }
  return {
    type: 'INIT_USER',
    data: user
  }
}

export const login = user => {
  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(user)
  )
  blogService.setToken(user.token)
  return ({
    type: 'INIT_USER',
    data: user
  })
}

export const logout = () => {
  window.localStorage.clear()
  return {
    type: 'CLEAR_USER'
  }
}


const reducer = (state = null, action) => {
  switch(action.type) {
    case 'INIT_USER':
      return action.data
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export default reducer