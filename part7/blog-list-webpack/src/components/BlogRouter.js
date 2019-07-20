import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Blog from './Blog'
import BlogList from './BlogList'

const BlogRouter = () => {
  return (
    <Switch>
      <Route
        path='/blogs/:id'
        render={({ match }) => <Blog id={match.params.id} />}
      />
      <Route path='/blogs' component={BlogList} />
    </Switch>
  )
}

export default BlogRouter
