const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')








describe('when there is initially some blogs saved', () => {
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

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
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

    test('returns 400 if blog does not have title and url properties', async () => {
      const newBlog = {
        author: 'Jeremy Wagner',
        likes: 4
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToDelete = blogsAtStart[0]
      
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDB()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

      const urls = blogsAtEnd.map(blog => blog.url)

      expect(urls).not.toContain(blogToDelete.url)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})