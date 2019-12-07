import React from 'react'
import {getTopTenHighScores} from '../../../server/firestore/databaseFunctions'
import SingleScore from './SingleScore'
import {Grid} from 'semantic-ui-react'
import './style.css'

export default class HighScoresLeaderBoard extends React.Component {
  constructor() {
    super()
    this.state = {
      scores: []
    }
  }

  async componentDidMount() {
    this.setState({
      scores: [
        {DisplayName: 'User', Score: 'Score'},
        ...(await getTopTenHighScores())
      ]
    })
  }

  render() {
    if (this.state.scores.length === 0) {
      return <div className="loading">Loading Scores</div>
    } else {
      return (
        <div>
          <p className="ranking">GLOBAL SCORE RANKING</p>
          <Grid columns="three">
            {this.state.scores.map((score, index) => (
              <SingleScore
                key={index}
                displayName={score.DisplayName}
                score={score.Score}
                place={index}
              />
            ))}
          </Grid>
        </div>
      )
    }
  }
}
