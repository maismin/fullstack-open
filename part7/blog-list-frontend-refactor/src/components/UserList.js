import React from 'react'
import { connect } from 'react-redux'
import {
  Link, Route, Redirect
} from 'react-router-dom'

const UserList = props => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {props.users.map(user => (
            <tr key={user.username}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Route path='/users/:id' render={({ match }) => 
        <Redirect to={`/users/${match.params.id}`}/>
      } />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (UserList)