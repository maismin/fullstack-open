import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin }) => {
  return (
    <form onSubmit={handleLogin} data-testid="login-form">
      <div>
        <label htmlFor="username-input">username</label>
        <input id="username-input" {...username} reset=""/>
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" {...password} reset=""/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm