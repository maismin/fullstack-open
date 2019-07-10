import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import loginService from '../services/login'

const LoginForm = (props) => {
  const handleLogin = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await loginService.login({
        username,
        password
      })
      props.login(user)
      props.initializeBlogs()
    } catch(exception) {
      props.setMessage('wrong username or password', 'error', 3000)
    }
  }

  return (
    <form onSubmit={handleLogin} 
          data-testid="login-form">
      <div>
        <label htmlFor="username-input">username</label>
        <input id="username-input" name="username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" name="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

const mapDispatchToProps = {
  login,
  initializeBlogs,
  setMessage
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)