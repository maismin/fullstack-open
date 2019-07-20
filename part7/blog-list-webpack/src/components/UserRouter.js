import React from 'react'
import { Route, Switch } from 'react-router-dom'
import User from './User'
import UserList from './UserList'

const UserRouter = () => {
  return (
    <Switch>
      <Route
        path='/users/:id'
        render={({ match }) => <User id={match.params.id} />}
      />
      <Route path='/users' component={UserList} />
    </Switch>
  )
}

export default UserRouter
