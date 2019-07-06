import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleUsername, handlePassword, handleLogin }) => (
  <form onSubmit={handleLogin} data-testid="login-form">
    <div>
      <label htmlFor="username-input">username</label>
      <input id="username-input"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => handleUsername(target.value)}
      />
    </div>
    <div>
      <label htmlFor="password">password</label>
      <input id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => handlePassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleUsernameChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm