import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import "./style.css"


export default class SingleScore extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Table.Row className="table">
                    <Table.Cell>{this.props.displayName}</Table.Cell>
                    <Table.Cell>{this.props.score}</Table.Cell>
                </Table.Row>
            </div>
        )
    }
    
}