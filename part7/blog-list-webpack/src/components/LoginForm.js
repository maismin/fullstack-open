import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginUserReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import loginService from '../services/login'
import { withRouter } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const LoginFormWithNoHistory = props => {
  const handleLogin = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await loginService.login({
        username,
        password,
      })
      props.login(user)
      props.initializeBlogs()
      props.history.push('/')
    } catch (exception) {
      props.setMessage('wrong username or password', 'error', 3000)
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleLogin} data-testid="login-form">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="username"
              name="username"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="password"
              name="password"
              type="password"
            />
            <Button fluid size="large" type="submit">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

const LoginForm = withRouter(LoginFormWithNoHistory)

const mapDispatchToProps = {
  login,
  initializeBlogs,
  setMessage,
}

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm)
