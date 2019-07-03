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
  })
})

afterAll(() => {
  mongoose.connection.close()
})