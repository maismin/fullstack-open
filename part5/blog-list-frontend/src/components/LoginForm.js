import React from 'react'

const LoginForm = ( {username, password, handleUsername, handlePassword, handleLogin }) => (
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => handleUsername(target.value)}
        />
    </div>
    <div>
      password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => handlePassword(target.value)}
        />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm