import React, { Component } from 'react';
import MatchesOriginal from './MatchesOriginal.jsx'
// import MatchesLeftCollapsed from './MatchesLeftCollapsed.jsx'
// import MatchesAsDecimal from './MatchesAsDecimal.jsx'
// import MatchesAsBinary from './MatchesAsBinary.jsx'

export default class MatchGame extends Component {
    constructor(props) { 
        super(props);
        this.matchVizOptions = [
            {
                name: "Original Matches",
                visualizer: MatchesOriginal
            },
            // {
            //     name: "Matches Left-Collapsed",
            //     visualizer: MatchesLeftCollapsed
            // },
            // {
            //     name: "Decimal Numbers",
            //     visualizer: MatchesAsDecimal
            // },
            // {
            //     name: "Binary Numbers",
            //     visualizer: MatchesAsBinary
            // },
        ]
        this.PLAYER_USER = 0;
        this.PLAYER_AI = 1;

        const numberOfRows = 4;
        const matchCounts = this._initializeMatchesArray(numberOfRows)
        this.state = {
            numberOfRows: numberOfRows,
            matches: matchCounts,
            previousMatches: matchCounts,
            userGoesFirst: true,
            currentPlayer: this.PLAYER_USER
        }
    }

    // Initialize our initial counts of matches based on the number of rows 
    _initializeMatchesArray(numberOfRows) {
        const matchCounts = [];
        for (let i = 0; i < numberOfRows; i++) { 
            matchCounts.push(1 + (2 * i)) 
        }
        return matchCounts;
    }

    // Increments the current count for the matches in the 'ith' row, being careful to not go above the previous highest value for that row
    incrementMatches = (i) => {
        const prevMax = this.state.prevMatches[i];
        const curCount = this.state.matches[i];
        if (curCount + 1 > prevMax) {
            return
        } else {
            const matchesWithInc = [...this.state.matches];
            matchesWithInc[i] += 1;
            this.setState({
                matches: matchesWithInc
            });
        }
    }

    // Decremenets the current count for the matches in the 'ith' row, being careful to not go below 0;
    decrementMatches = (i) => {
        const curCount = this.state.matches[i];
        if (curCount - 1 < 0) {
            return
        } else {
            const matchesWithDec = [...this.state.matches];
            matchesWithDec[i] += 1;
            this.setState({
                matches: matchesWithDec
            });
        }
    }

    // 

    render() { 
        // Game is made up of these pieces 
        // 1. Rows of macthes visualized someway - whole row is based on the selected visualizer
        // 2. Toggle to determine who should be going first
        // 3. Dropdown for how we want to visualize the matches - iin terms of 
        // 4. Done button to signal a player's move is over 
        
        // Game mechanics consist of 
        // If in lose condition, current player loses
        // 
        // Else, Current player (whoever that is) makes their move: 
        //  IF Currentplayer is the user, then we wait until the done button is clicked to lock in changes 
            // Locking in might map directly onto the AI making a move
        // If Currentplayer is the AI we calculate the optimal number of 
            //   Possiubly have some stochasiticity that can map onto the likelihood that the AI makes the imperfect play
        // Loop

        // Subtle Game Details: 
        // Row should highlight on hover when no row has been selected; 
        // Each row should have +/- buttons 
        // 
        const { matches, numberOfRows, matchCounts } = this.state;
        return (
            <MatchesOriginal
                matches={this.state.matches}
                incrementMatches={this.incrementMatches}
                decrementMatches={this.decrementMatches}
            />
        );
    }
}