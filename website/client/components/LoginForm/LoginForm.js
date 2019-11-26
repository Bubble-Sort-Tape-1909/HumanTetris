import {Redirect} from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import {loginUser} from '../../store/auth'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSignInClick = this.onSignInClick.bind(this)
  }

  handleEmailChange = ({target}) => {
    this.setState({email: target.value})
  }

  handlePasswordChange = ({target}) => {
    this.setState({password: target.value})
  }

  handleSubmit = () => {
    const {dispatch} = this.props
    const {email, password} = this.state

    dispatch(loginUser(email, password))
  }

  render() {
    const {classes, loginError, isAuthenticated} = this.props
    if (isAuthenticated) {
      return <Redirect to="/" />
    } else {
      return (
        <Grid
          textAlign="center"
          style={{height: '100vh'}}
          verticalAlign="middle"
        >
          <Grid.Column style={{maxWidth: 450}}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="/logo.png" /> Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.handleSubmit}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="/signup">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(LoginForm)
