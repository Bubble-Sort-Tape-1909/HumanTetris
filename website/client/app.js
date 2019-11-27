// import React from 'react'

// import {Navbar} from './components/index'
// import Routes from './routes'

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes />
//     </div>
//   )
// }

// export default App

import React from 'react'

import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import ProtectedRoute from './components/ProtectedRoute'
import UserHome from './components/UserHome/user-home'
import LoginForm from './components/LoginForm/LoginForm'
import {Navbar} from './components/index'

function App(props) {
  const {isAuthenticated, isVerifying} = props
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

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(App)
