import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Icon
} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import {auth} from '../../../firebase/Firebase'
import {addUser} from '../../../server/firestore/databaseFunctions'


class SignUpForm extends React.Component {
  constructor() {
    super()
    this.state = {
      displayName: '',
      email: '',
      password: '',
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (
      this.state.displayName.length < 1 ||
      this.state.email.length < 7 ||
      this.state.password.length < 5 || this.state.password.toLowerCase() === this.state.password
    ) {
      window.alert('PLEASE COMPLETE THE FORM')
    } else {
      //signs user up and sends to firestore
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      const user = {
        Email: this.state.email,
        DisplayName: this.state.displayName,
        Scores: []
      }
      addUser(user)

      this.setState({
        displayName: '',
        email: '',
        password: ''
      })
      //redirect to some page after wiping state and adding to firestore db
      this.state.redirected = true
      return (<Redirect to="/" />)
    }
  }
  
  render() {
    if (this.state.redirected === true) {
      console.log('redirect me')
      return (<Redirect to="/singleplayer" />)
    }
    
    return (
      <Grid textAlign="center">
        <Grid.Column>
          <Header as="h3" color="red" textAlign="center">
          <Icon color="green" name="sign-in" />
            New Player Sign Up
          </Header>
          <Form size="large" onSubmit={() => this.handleSubmit(event)}>
            <Form.Input
              icon="user secret"
              iconPosition="left"
              placeholder="DisplayName"
              name="displayName"
              onChange={this.handleChange}
              value={this.state.displayName}
            />
            <Form.Input
              icon="user"
              iconPosition="left"
              placeholder="Email"
              type="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              placeholder="Password - must be at least 8 characters and include an uppercase character"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <Button color="blue" type="submit">
              Sign Up!
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignUpForm