import React, { Component } from 'react';

export default class Match extends Component {
    handleClick = (e) => { 
        e.preventDefault();
        this.props.handleClick();
    }

    render () {
        return (
            <img src="matchstick.png" onClick={this.handleClick} alt="One of the matches in this row"/>
        );
    }
}