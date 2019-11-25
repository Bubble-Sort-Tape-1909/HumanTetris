import firebase from 'firebase'
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

  render() {
    return (
      <Grid textAlign="center" style={{height: '100vh'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-in to your account
          </Header>
          <Form size="large" onSubmit={() => this.handleSubmit()}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />

              <Button color="teal" fluid size="large">
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

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onSignInClick = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/')
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorMessage)
          console.log(
            'error code: ',
            errorCode,
            ' || error message: ',
            errorMessage
          )
        })
    } catch (error) {
      console.log(error.toString(error))
    }
  }
}

export default connect(null, null)(LoginForm)