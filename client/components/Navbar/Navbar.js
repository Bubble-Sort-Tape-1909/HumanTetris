import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Dropdown, Icon, Image, Menu, Popup} from 'semantic-ui-react'
import {logoutUser} from '../../store/auth'
import './styles.css'

const Navbar = props => {
  return (
    <div>
      <nav>
        <Menu stackable borderless inverted>
          <Menu.Item as={Link} to="/singleplayer">
            <Image src="/HTNavBar.png" size="mini" />
          </Menu.Item>
          <Menu.Item name="Play">
            <Icon color="green" name="gamepad" />
            <Dropdown text="Play">
              <Dropdown.Menu>
                <Dropdown.Item
                  name="Single-Player"
                  as={Link}
                  to="/singleplayer"
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
                <Dropdown.Item
                  name="Global"
                  as={Link}
                  to="/leaderboards/global"
                >
                  <Icon name="globe" />
                  Global
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Menu position="right">
            {props.isAuthenticated ? (
              <Menu.Item name="profileDropdown">
                {/* The navbar will show these links after you log in */}
                <Dropdown icon="user" labeled>
                  <Dropdown.Menu>
                    <Dropdown.Header content={`Hello ${props.user.email}!`} />
                    <Dropdown.Divider />
                    <Dropdown.Item name="profile" as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item name="logout" onClick={props.logoutUser}>
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
                    <Dropdown.Item name="signup" as={Link} to="/signup">
                      Signup
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
