import React, { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogRouter from './components/BlogRouter'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserRouter from './components/UserRouter'
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
import {
  Container
} from 'semantic-ui-react'

const App = (props) => {
  useEffect(() => {
    props.initializeLoginUser()
    props.initializeUsers()
    props.initializeBlogs()
  }, [])

  if (props.loginUser === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Container>
      <NavBar />
      <h2>Blog App</h2>
      <Notification />
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <Route exact path='/' render={() => <BlogList />} />
      <Route path='/blogs' render={() => <BlogRouter />} />
      <Route path='/users' render={() => <UserRouter />} />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser
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