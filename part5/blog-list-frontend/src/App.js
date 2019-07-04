import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'


const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
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
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const updateLikes = async (blog) => {
    const newLike = blog.likes + 1
    const newBlog = {
      user: blog.user.id,
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: newLike
    }

    const updatedBlog = await blogService.update(blog.id, newBlog)
    const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b)
    sortBlogByLikes(updatedBlogs)
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
          handleUsername={setUsername}
          handlePassword={setPassword}
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
          handleTitle={setTitle}
          handleAuthor={setAuthor}
          handleUrl={setUrl}
          handleBlog={addBlog}
        />
      </Togglable>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLikes={updateLikes} handleDelete={blog.user.username === user.username ? deleteBlog : null}/>)}
    </div>
  )
}

export default App