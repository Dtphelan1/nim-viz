import React, { Component, Fragment } from 'react';
import MatchesOriginal from './MatchesOriginal.jsx';
import TurnActionBar from './TurnActionBar.jsx';
import _ from 'lodash';
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

        // Configuration of Game State:
        // TODO: Move into state once modifiable;
        this.numberOfRows = 4;
        this.userGoesFirst = true;

        const matchCounts = this._initializeMatchesArray()
        this.state = {
            provisionalMatches: matchCounts,
            initialMatchesOnTurn: matchCounts,
            currentPlayer: this.PLAYER_USER
        }
    }

    // Handle the automated turns of the AI anytime the screen updates
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (_.max(this.state.initialMatchesOnTurn) === 0) {
            // First - check to see if there is a winner:
            const winner = this.state.currentPlayer === this.PLAYER_AI ? "AI" : "User";
            // The winner is the first person to start their turn with a 0 maxMatches
            console.log("Congratulations on winning " + winner + "!");
        } else if(this.state.currentPlayer === this.PLAYER_AI) { 
            // Else, if the AI's turn is up let the algo go!
            this._AITurn()
        }
    }

    // Initialize our initial counts of matches based on the number of rows 
    _initializeMatchesArray() {
        const matchCounts = [];
        for (let i = 0; i < this.numberOfRows; i++) { 
            matchCounts.push(1 + (2 * i)) 
        }
        return matchCounts;
    }

    // Internally defined function for transitioning from one turn to the next
    _nextPlayer() {
        switch(this.state.currentPlayer) {
            case this.PLAYER_AI:
                return this.PLAYER_USER;
            case this.PLAYER_USER:
                return this.PLAYER_AI;
            default: 
                console.error(`Switching current player but the turn-switch mechanic is undefined for this player ${this.state.currentPlayer}`);
                return null;
        }
    }

    // Propagate our matche
    updateMatches = (optionalMatches) => {
        console.log('updateMatches: ');
        // Use the argument if provided; else use the current matches
        const newMatches = optionalMatches ? optionalMatches : this.state.provisionalMatches
        console.log('newMatches: ', newMatches);
        this.setState({
            initialMatchesOnTurn: newMatches,
            provisionalMatches: newMatches
        });
    }

    // Increments the current count for the matches in the 'ith' row, being careful to not go above the previous highest value for that row
    incrementMatches = (i) => {
        const prevMax = this.state.initialMatchesOnTurn[i];
        const curCount = this.state.provisionalMatches[i];
        if (curCount + 1 > prevMax) {
            return
        } else {
            const matchesWithInc = [...this.state.provisionalMatches];
            matchesWithInc[i] += 1;
            this.setState({
                provisionalMatches: matchesWithInc
            });
        }
    }

    // Decremenets the current count for the matches in the 'ith' row, being careful to not go below 0;
    decrementMatches = (i) => {
        const curCount = this.state.provisionalMatches[i];
        if (curCount - 1 < 0) {
            return
        } else {
            const matchesWithDec = [...this.state.provisionalMatches];
            matchesWithDec[i] -= 1;
            this.setState({
                provisionalMatches: matchesWithDec
            });
        }
    }

    // Resets the matches to how they were oriented at the beginning of the turn
    resetTurn = () => {
        this.setState({
            provisionalMatches: this.state.initialMatchesOnTurn
        });
    }

    // Switches the current player 
    switchCurrentPlayer = () => {
        const nextPlayer = this._nextPlayer();
        this.setState({
            currentPlayer: nextPlayer
        });
    }

    // TODO: Better name;
    // Finding a move baed on the nimSum: find a row with matchCount 'x' for which x > 0 && x ^ nimSum < x;
    // Return the index of the current row, and the original count minus the XOR value 
    _getMoveBasedOnSum(nimSum) {
        console.log('_getMoveBasedOnSum: ');
        // Have an illegal index initially 
        let index = -1;
        let valueToRemove = 0;
        this.state.provisionalMatches.forEach((count, curIndex) => {
            // Stop iterating if we have a value to remove; i.e. if index is legal
            if (index >= 0) return; 
            console.log('count: ', count);
            console.log('curIndex: ', curIndex);
            console.log('count ^ nimSum: ', count ^ nimSum);
            // TODO: Get rid of > 0 check; will never satisfy the second case if <=0 
            if ((count > 0) && ((count ^ nimSum) < count)) {
                console.log("Found a good row!") 
                index = curIndex;
                valueToRemove = count - (count ^ nimSum);
            }
        });
        return [index, valueToRemove]; 
    }

    _AITurn= () =>{
        // Strategy can be broken up into two modes: Endgame and typical
        // First, check to see if we are in an endgame orientation - specifically, if there is <= 1 row left with more than one match
        const curMatches = this.state.provisionalMatches;
        const isEndGame = _.reduce(curMatches, (acc, count) => count > 1 ? acc + 1 : acc, 0) <= 1;
        if (isEndGame) {
            // Calc the # of remaining turns by looking at the non-zero rows
            const remainingTurns = _.reduce(curMatches, (acc, count) => count > 0 ? acc + 1 : acc, 0);
            const maxVal = _.max(curMatches);
            const indexOfMax = curMatches.indexOf(maxVal)
            const newMatches = [...curMatches];
            newMatches[indexOfMax] -= maxVal;
            this.finalizeTurn(newMatches);
        } else { 
            // First, get the nim sum of all the remaining match-rows, i.e. XOR all counts together
            const nimSum = _.reduce(curMatches, (nimSum, count) => count ^ nimSum, 0);
            console.log('nimSum: ', nimSum);
            // Then, get the next value to remove and the index from the nimSum - if there is such a move
            const [index, valueToRemove] = this._getMoveBasedOnSum(nimSum);
            if (index === -1) {
                console.log("Index is -1 - no traditional removals available");
            } else {
                const newMatches = [...curMatches];
                newMatches[index] -= valueToRemove;
                console.log('newMatches: ', newMatches);
                this.finalizeTurn(newMatches)
            }
        }
    }

    finalizeTurn = (optionalMatches) => {
        this.updateMatches(optionalMatches);
        this.switchCurrentPlayer();
    }

    // Restarts the game to it's initial configuration
    restartGame = () => {
        const initialMatches = this._initializeMatchesArray();
        console.log('initialMatches: ', initialMatches);
        this.setState({
            provisionalMatches: initialMatches,
            initialMatchesOnTurn: initialMatches,
            currentPlayer: this.userGoesFirst ? this.PLAYER_USER : this.PLAYER_AI
        });
    }

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
        return (
            <Fragment>
                <MatchesOriginal
                    provisionalMatches={this.state.provisionalMatches}
                    initialMatchesOnTurn={this.state.initialMatchesOnTurn}
                    incrementMatches={this.incrementMatches}
                    decrementMatches={this.decrementMatches}
                />
                <TurnActionBar
                    restartGame={this.restartGame}
                    resetTurn={this.resetTurn}
                    finalizeTurn={this.finalizeTurn}
                />
            </Fragment>
        );
    }
}