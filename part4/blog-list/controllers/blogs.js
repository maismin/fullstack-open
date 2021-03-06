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

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1 })
    response.json(blog.toJSON())
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
      user: user._id,
      comments: body.comments
    })

    if (blog.title === undefined && blog.url === undefined) {
      response.status(400).end()
    } else {
      if (blog.likes === undefined) {
        blog.likes = 0
      }
      blog.save()
        .then(returnedBlog => {
          returnedBlog
            .populate('user', { username: 1, name: 1 })
            .execPopulate()
            .then(async savedBlog => {
              user.blogs = user.blogs.  concat(savedBlog._id)
              await user.save()
              response.status(201).json(savedBlog.toJSON())
            })
        })     
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.user.id)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: body.comments
  }

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .populate('user', { username: 1, name: 1 })
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const comment = request.body.comment
    const updateComment = { $push: { comments: comment }}
    await Blog.findByIdAndUpdate(request.params.id, updateComment)
    response.status(201).json({ comment: comment})
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      response.status(404).end()
    }

    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      //remove blogid from user
      user.blogs = user.blogs.filter(blogID => blogID.toString() !== request.params.id)
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