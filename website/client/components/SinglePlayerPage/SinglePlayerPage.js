import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Button} from 'semantic-ui-react'

import {sendUserScore} from '../../store/userScore'

import './style.css'

export class SinglePlayerPage extends Component {
  constructor() {
    super()
    this.state = {
      userScore: 0
    }
    this.callback = this.callback.bind(this)
  }

  // Callback function to execute when mutations are observed
  callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        this.setState({
          userScore: Number(document.getElementById('gameScore').innerHTML)
        })

        if (this.state.userScore) {
          this.props.sendUserScore(this.state.userScore)
        }
      } else if (mutation.type === 'attributes') {
        console.log(
          'The ' + mutation.attributeName + ' attribute was modified.'
        )
      }
    }
  }

  componentDidMount() {
    let gameScore = document.getElementById('gameScore')

    // Options for the observer (which mutations to observe)
    const config = {attributes: true, childList: true, subtree: true}

    // Create an observer instance linked to the callback function
    this.observer = new MutationObserver(this.callback)

    // Start observing the target node for configured mutations
    this.observer.observe(gameScore, config)
  }

  componentWillUnmount() {
    this.observer.disconnect()
  }
  render() {
    return (
      <div id="Game">
        <Grid columns="three">
          <Grid.Row>
            <Grid.Column>
              <Button id="startGame" type="submit" className="youGotIt">
                Start Game
              </Button>
            </Grid.Column>
            <Grid.Column>
              <h1>Your Final Score: </h1>
            </Grid.Column>
            <Grid.Column>
              <h1 id="gameScore"> 0 </h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendUserScore: userScore => dispatch(sendUserScore(userScore))
})

export default connect(null, mapDispatchToProps)(SinglePlayerPage)
