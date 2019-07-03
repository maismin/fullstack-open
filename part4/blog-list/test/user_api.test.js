const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially some users saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.initialUsers
      .map(user => new User(user))

    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  describe('creation of a new user', () => {
    test('succeeds with valid data', async () => {
      const newUser = {
        username: 'veryamaethon',
        name: 'simon',
        password: 'test'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(newUser.username)
    })

    test('fails with proper status code when username is taken', async () => {
      const newUser = {
        username: 'ephemeral',
        name: 'simon',
        password: 'test'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })

    test('fails with proper status code when username is missing', async () => {
      const newUser = {
        name: 'simon',
        password: 'test'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` is required')

      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd.length).toBe(helper.initialUsers.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})