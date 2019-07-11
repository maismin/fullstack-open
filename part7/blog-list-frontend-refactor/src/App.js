import React, { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserRouter from './components/UserRouter'
import Notification from './components/Notification'
import './App.css'
import { connect } from 'react-redux'
import {
  initializeBlogs,
  clearBlogs
} from './reducers/blogReducer'
import {
  initializeLoginUser,
  logout
} from './reducers/loginUserReducer'
import {
  initializeUsers
} from './reducers/userReducer'
import {
  Route
} from 'react-router-dom'

const App = (props) => {
  useEffect(() => {
    props.initializeLoginUser()
    props.initializeUsers()
    props.initializeBlogs()
  }, [])

  const logout = () => {
    props.logout()
    props.clearBlogs()
  }

  const userById = id => {
    return props.users.find(user => user.id === id)
  }

  if (props.loginUser === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{props.loginUser.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <Route exact path='/' render={() => <BlogList />} />
      <Route path='/users' render={() => <UserRouter />} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  clearBlogs,
  initializeLoginUser,
  logout,
  initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)