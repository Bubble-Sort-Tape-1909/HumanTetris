import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon
} from 'semantic-ui-react'
import {loginUser} from '../../store/auth'

import './styles.css'

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
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

    dispatch(loginUser('EMAIL', email, password))
  }

  handleGoogleSubmit = () => {
    const {dispatch} = this.props
    dispatch(loginUser('GOOGLE'))
  }

  handleFacebookSubmit = () => {
    const {dispatch} = this.props
    dispatch(loginUser('FACEBOOK'))
  }

  render() {
    const {loginError, isAuthenticated} = this.props
    if (isAuthenticated) {
      return <Redirect to="/singleplayer" />
    } else {
      return (
        <Grid
          textAlign="center"
          style={{height: '100vh'}}
          verticalAlign="middle"
        >
          <Grid.Row>
            <Image
              src="Tetris.png"
              className="customLogoImg"
              alt="Custom Tetris Logo"
            />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column style={{maxWidth: 500}}>
              <Header as="h2" color="teal" textAlign="center">
                <h1 className="loginHeader">Log-in to your account</h1>
              </Header>
              <Form size="large" error>
                <Segment stacked>
                  {/* If there's a login errror, display an alert to the user */}
                  {loginError && (
                    <Message
                      error
                      header="Error"
                      content="Incorrect email or password"
                    />
                  )}
                  <Form.Input
                    fluid
                    icon="mail"
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
                    positive
                    fluid
                    size="large"
                    onClick={this.handleSubmit}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                <h4>Or Login With</h4>
                <Button color="google plus" onClick={this.handleGoogleSubmit}>
                  <Icon name="google" /> Google
                </Button>
                <Button color="facebook">
                  <Icon name="facebook" onClick={this.handleFacebookSubmit} />
                  Facebook
                </Button>
              </Message>
              <Message>
                New to us? <a href="/signup">Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid.Row>
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

export default connect(mapStateToProps)(LoginPage)
