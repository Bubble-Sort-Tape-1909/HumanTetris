import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import {
  EditProfilePage,
  LoginPage,
  Navbar,
  ProfilePage,
  UserHome,
  SinglePlayerPage,
  SignUpForm
} from './components/index'
import ProtectedRoute from './components/ProtectedRoute'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    const {isAuthenticated, isVerifying} = this.props

    return (
      <div>
        <Navbar />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={UserHome}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/profile"
            component={ProfilePage}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/profile/edit"
            component={EditProfilePage}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <Route path="/singleplayer" component={SinglePlayerPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpForm} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, null)(Routes))
