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
      {isLoggedIn ? (
        <Menu>
          {/* The navbar will show these links after you log in */}
          <Menu.Item name="Human Tetris" as={Link} to="/" />
          <Menu.Item name="Play" as={Link} to="/play" />
          <Menu.Item name="Logout" onClick={handleClick} as={Link} to="/" />
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </Menu>
      ) : (
        <Menu>
          {/* The navbar will show these links if you're a guest */}
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
            <Menu.Item name="profileDropdown">
              <Dropdown icon="user" labeled className="icon">
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
          </Menu.Menu>
        </Menu>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
