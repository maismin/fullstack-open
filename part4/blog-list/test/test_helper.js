const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'ephemeral',
    name: 'simon',
    password: 'test'
  },
  {
    username: 'raiden',
    name: 'david',
    password: 'test'
  },
  {
    username: 'toothpick',
    name: 'dennis',
    password: 'test'
  }
]

const initialBlogs = [
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

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB,
  initialUsers,
  usersInDB
}