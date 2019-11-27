import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Navbar, LoginForm, UserHome} from './components/index'
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
          <Route path="/login" component={LoginForm} />
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
