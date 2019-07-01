const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    if (blog.title === undefined && blog.url === undefined) {
      response.status(400).end()
    } else {
      if (blog.likes === undefined) {
        blog.likes = 0
      }
      const newBlog = await blog.save()
      response.status(201).json(newBlog.toJSON())
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter