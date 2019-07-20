import React, { useState } from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginUserReducer'
import { clearBlogs } from '../reducers/blogReducer'
import { Link, withRouter } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'

const NavBarWithNoHistory = props => {
  const [activeItem, setActiveItem] = useState('blogs')

  const handleClick = () => {
    props.logout()
    props.clearBlogs()
    props.history.push('/')
  }

  return (
    <Menu pointing inverted>
      <Menu.Item
        as={Link}
        to="/"
        active={activeItem === 'blogs'}
        onClick={() => setActiveItem('blogs')}
      >
        Blogs
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/users"
        active={activeItem === 'users'}
        onClick={() => setActiveItem('users')}
      >
        Users
      </Menu.Item>
      <Menu.Item position="right">{props.loginUser.name} logged in</Menu.Item>
      <Menu.Item>
        <Button onClick={handleClick}>Logout</Button>
      </Menu.Item>
    </Menu>
  )
}

const NavBar = withRouter(NavBarWithNoHistory)

const mapStateToProps = state => {
  return {
    loginUser: state.loginUser,
  }
}

const mapDispatchToProps = {
  clearBlogs,
  logout,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar)
