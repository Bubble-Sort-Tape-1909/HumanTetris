import React, {Component} from 'react'
import {sendUserScore} from '../../store/userScore'

export default class SinglePlayerPage extends Component {
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
          console.log('inside of if')
          sendUserScore(this.userScore)()
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
        <button id="startGame" type="submit" className="youGotIt">
          Start Game
        </button>

        <h1>Ypur score: {this.state.userScore}</h1>
        <h1 id="gameScore"> </h1>
      </div>
    )
  }
}
