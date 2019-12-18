import React from 'react'
import {Grid, Divider} from 'semantic-ui-react'
import './style.css'

export default function SingleScore(props) {
  if (props.place === 0)
    return (
      <Grid.Row>
        <Grid.Column className="globalLiderBoardHeader">Place</Grid.Column>
        <Grid.Column className="globalLiderBoardHeader">User</Grid.Column>
        <Grid.Column className="globalLiderBoardHeader">Score</Grid.Column>
        <Divider />
      </Grid.Row>
    )
  else
    return (
      <Grid.Row className="globalLiderBoard">
        <Grid.Column>{props.place}</Grid.Column>
        <Grid.Column>{props.displayName}</Grid.Column>
        <Grid.Column>{props.score}</Grid.Column>
      </Grid.Row>
    )
}
