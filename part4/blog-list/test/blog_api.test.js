const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('the unique id property of blogs is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Responsible JavaScript: Part II',
    author: 'Jeremy Wagner',
    url: 'https://alistapart.com/article/responsible-javascript-part-2/',
    likes: 10
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)

  const urls = blogsAtEnd.map(blog => blog.url)
  expect(urls).toContain(newBlog.url)
})

test('a missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'Responsible JavaScript: Part II',
    author: 'Jeremy Wagner',
    url: 'https://alistapart.com/article/responsible-javascript-part-2/'
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDB()
  const returnedBlog = blogsAtEnd.filter(blog => blog.url === newBlog.url)[0]
  expect(returnedBlog.likes).toBe(0)
})

test('return 400 if blog does not have the title and url properties ', async () => {
  const newBlog = {
    author: 'Jeremy Wagner',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})