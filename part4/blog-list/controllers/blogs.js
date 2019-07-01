const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const _ = require('lodash')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!_.has(blog, 'likes')) {
    blog.likes = 0
  }

  const newBlog = await blog.save()
  response.status(201).json(newBlog.toJSON())
})

module.exports = blogsRouter