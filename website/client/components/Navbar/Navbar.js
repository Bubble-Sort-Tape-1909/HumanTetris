import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import {Menu, Dropdown, Popup, Icon} from 'semantic-ui-react'
import './styles.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <Menu>
        <Menu.Item name="Human Tetris" as={Link} to="/" />
        <Menu.Item name="Play">
          <Icon color="green" name="gamepad" />
          <Dropdown text="Play">
            <Dropdown.Menu>
              <Dropdown.Item
                name="Single-Player"
                as={Link}
                to="/play/singleplayer"
              >
                <Icon name="user" />
                Single-player
              </Dropdown.Item>
              <Popup
                trigger={
                  <span>
                    <Dropdown.Item name="Multi-player" disabled={true}>
                      <Icon name="users" />
                      Multi-player
                    </Dropdown.Item>
                  </span>
                }
                content="Coming Soon!"
                position="right center"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item name="Leaderboards-Dropdown">
          <Icon color="yellow" name="winner" />
          <Dropdown text="Leaderboards">
            <Dropdown.Menu>
              <Dropdown.Item name="Local" as={Link} to="/leaderboards/local">
                <Icon name="home" />
                Local
              </Dropdown.Item>
              <Dropdown.Item name="Global" as={Link} to="/leaderboards/global">
                <Icon name="globe" />
                Global
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Menu position="right">
          {isLoggedIn ? (
            <Menu.Item name="profileDropdown">
              {/* The navbar will show these links after you log in */}
              <Dropdown icon="user" labeled>
                <Dropdown.Menu>
                  <Dropdown.Header content="Hello User!" />
                  <Dropdown.Divider />
                  <Dropdown.Item
                    name="logout"
                    onClick={handleClick}
                    as={Link}
                    to="/"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          ) : (
            <Menu.Item name="profileDropdown">
              {/* The navbar will show these links if you're a guest */}
              <Dropdown icon="user" labeled>
                <Dropdown.Menu>
                  <Dropdown.Header content="Hello Guest!" />
                  <Dropdown.Divider />
                  <Dropdown.Item name="login" as={Link} to="/login">
                    Login
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="signup"
                    onClick={handleClick}
                    as={Link}
                    to="/signup"
                  >
                    Signup
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  console.log(state)
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(firebaseEmailAndPasswordSignIn(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
