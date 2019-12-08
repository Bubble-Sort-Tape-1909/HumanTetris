import React from 'react'
import SingleScore from '../SingleScore'
import {Grid} from 'semantic-ui-react'
import '../style.css'

class LocalScoreLeaderboard extends React.Component {
  constructor() {
    super()
    this.state = {
      scores: [
        {DisplayName: 'MaksimP', Score: 5880},
        {DisplayName: 'MaksimP', Score: 5760},
        {DisplayName: 'MaksimP', Score: 5240},
        {DisplayName: 'MaksimP', Score: 4300},
        {DisplayName: 'MaksimP', Score: 4210},
        {DisplayName: 'MaksimP', Score: 4200},
        {DisplayName: 'MaksimP', Score: 4110},
        {DisplayName: 'MaksimP', Score: 4110},
        {DisplayName: 'MaksimP', Score: 3990},
        {DisplayName: 'MaksimP', Score: 3980}
      ]
    }
  }

  render() {
    return (
      <div>
        {!this.state.scores.length && (
          <div className="loading">Loading Scores</div>
        )}
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

export default LocalScoreLeaderboard
