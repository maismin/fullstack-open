const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const user = await User
      .findById(id)
      .populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(user.toJSON())
  } catch(exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    // Check if password exists and is at least 3 characters long
    const password = body.password
    if (!password || password.length < 3) {
      response.status(400).json({
        error: 'missing password or password length is less than 3'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter