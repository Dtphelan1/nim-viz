import React, { Component } from 'react';

export default class Match extends Component {
    handleClick = (e) => {
        e.preventDefault();
        // this.props.handleClick();
    }

    render () {
        const dimension = 75;
        return (
            <img
                src="matchstick.png"
                onClick={this.handleClick}
                style={{
                    'width': dimension,
                    'height': dimension,
                }}
                alt="One of the matches in this row"
            />
        );
    }
}