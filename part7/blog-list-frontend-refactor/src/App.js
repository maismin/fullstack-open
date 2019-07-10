import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'


const App = (props) => {
  // console.log('props',props)
  const [ blogs, setBlogs ] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const username = useField('text')
  const password = useField('text')
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      sortBlogByLikes(blogs)
    }
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      fetchBlogs()
    }
    props.initializeBlogs()
  }, [])

  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleError = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch(exception) {
      handleError('wrong username or password')
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    setBlogs([])
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    handleNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    title.reset()
    author.reset()
    url.reset()
  }

  const sortBlogByLikes = (blogs) => {
    setBlogs(blogs.sort((a,b) => b.likes - a.likes))
  }

  const deleteBlog = async (blog) => {
    try {
      const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
      if (result) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch(exception) {
      handleError('Error: unauthorized user')
    }
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={error} classType='error' />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} classType='success'/>
      <Notification message={error} classType='error' />
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel='new blog'>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleBlog={addBlog}
        />
      </Togglable>
      <div data-testid='blog-list'>
        <BlogList />
        )}
      </div>
    </div>
  )
}

export default connect(null, { initializeBlogs })(App)