const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((blog1, blog2) =>
    blog1 && blog1.likes > blog2.likes ? blog1 : blog2, null)
}

const mostBlogs = (blogs) => {
  let groupByAuthors = _.groupBy(blogs, 'author')
  groupByAuthors = Object.entries(groupByAuthors).map(entry => {
    return {
      author: entry[0],
      blogs: entry[1].length
    }
  })
  return groupByAuthors.reduce((author1, author2) =>
    author1 && author1.blogs > author2.blogs ? author1 : author2, null)
}

const mostLikes = (blogs) => {
  let groupByAuthors = _.groupBy(blogs, 'author')
  groupByAuthors = Object.entries(groupByAuthors).map(entry => {
    return {
      author: entry[0],
      likes: totalLikes(entry[1])
    }
  })
  return groupByAuthors.reduce((author1, author2) =>
    author1 && author1.likes > author2.likes ? author1 : author2, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}