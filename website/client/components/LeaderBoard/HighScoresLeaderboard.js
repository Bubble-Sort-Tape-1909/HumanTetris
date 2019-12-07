import React from 'react'
import {getTopTenHighScores} from '../../../server/firestore/databaseFunctions'
import SingleScore from './SingleScore'
import { Icon, Grid } from 'semantic-ui-react';
import "./style.css"

 
export default class HighScoresLeaderBoard extends React.Component {
    constructor() {
        super()
        this.state = {
            scores: []
        }
    }

    async componentDidMount() {
        this.setState({
            scores: [{DisplayName: 'User', Score: 'Score'}, ...await getTopTenHighScores()]
        })
    }

    render() {
        if (this.state.scores.length === 0) {
            return (<div>Loading Scores</div>)
        } else {
           return (
            <div>
                <Grid columns="three">
                    {this.state.scores.map((score, index) => (
                        <SingleScore key={index} displayName={score.DisplayName} score={score.Score} place={index}/>
                    ))}
                </Grid>
            </div>
            
        ) 
        }        
    }
    
}