import React from 'react'
import { Grid, Header } from 'semantic-ui-react';
import "./style.css"


export default class SingleScore extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.place === 0) return   <Grid.Row>
                <Grid.Column><Header>Place</Header></Grid.Column>
                <Grid.Column><Header>User</Header></Grid.Column>
                <Grid.Column><Header>Score</Header></Grid.Column>
        </Grid.Row>
        else return   (
            <Grid.Row>
                <Grid.Column>{this.props.place}</Grid.Column>
                <Grid.Column>{this.props.displayName}</Grid.Column>
                <Grid.Column>{this.props.score}</Grid.Column>
            </Grid.Row>
        )
    }

}