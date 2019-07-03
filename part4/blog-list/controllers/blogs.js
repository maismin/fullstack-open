const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = request.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (blog.title === undefined && blog.url === undefined) {
      response.status(400).end()
    } else {
      if (blog.likes === undefined) {
        blog.likes = 0
      }
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      response.status(404).end()
    }

    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      //remove blogid from user
      user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
      await User.findByIdAndUpdate(decodedToken.id, user)
      response.status(204).end()
    } else {
      response.status(401).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter