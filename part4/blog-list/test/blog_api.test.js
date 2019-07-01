const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

initialBlogs = [
  {
    title: 'CSS Grid Layout: A Quick Start Guidel',
    author: 'Ian Yates',
    url: 'https://webdesign.tutsplus.com/tutorials/css-grid-layout-quick-start-guide--cms-27238',
    likes: 3
  },
  {
    title: 'Start Here: Learn CSS Typography',
    author: 'Kezz Bracey',
    url: 'https://webdesign.tutsplus.com/courses/start-here-learn-css-typography',
    likes: 6
  },
  {
    title: 'Introduction to SMACSS',
    author: 'Adi Purdila',
    url: 'https://webdesign.tutsplus.com/courses/introduction-to-smacss',
    likes: 8
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body.length).toBe(initialBlogs.length)
})

test('the unique id property of blogs is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})