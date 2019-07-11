import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
  return (
    <div>
      {props.blogs.map(blog =>
        <div key={blog.id} className="blogStyle">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (BlogList)