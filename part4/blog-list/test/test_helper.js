const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs,
    blogsInDB
}