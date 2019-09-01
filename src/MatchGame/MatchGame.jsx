import React, { Component } from 'react';
import { Redirect } from 'react-router'
import MatchesOriginal from '../MatchesOriginal/MatchesOriginal.jsx';
import TurnActionBar from '../TurnActionBar/TurnActionBar.jsx';
import ForceAIMoveButton from '../ForceAIMoveButton/ForceAIMoveButton.js';
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
            currentPlayer: this.PLAYER_USER,
            isFirstTurn: true,
            winner: undefined
        }
    }

    // Handle the automated turns of the AI anytime the screen updates
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (_.max(this.state.initialMatchesOnTurn) === 0 && !this.state.winner) {
            // First - check to see if there is a winner:
            const winner = this.state.currentPlayer === this.PLAYER_AI ? "AI" : "User";
            // The winner is the first person to start their turn with a 0 maxMatches
            console.log("Congratulations on winning " + winner + "!");
            this.setState({
                winner
            });
        } else if(this.state.currentPlayer === this.PLAYER_AI) { 
            // Else, if the AI's turn is up let the algo go!
            this._AITurn()
        }
    }

    // Return an initialized array of matches based on the number of rows the game has
    _initializeMatchesArray() {
        const matchCounts = [];
        // For each row 0,1,2,3,... we have, push 1,3,5,7,... matches
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

    // TODO: Better name;
    // Finding a move baed on the nimSum: find a row with matchCount 'x' for which x > 0 && x ^ nimSum < x;
    // Return the index of the current row, and the original count minus the XOR value 
    _getOptimalMoveBasedOnSum(nimSum) {
        // Have an illegal index initially; inital value to remove shouldn't matter
        let index = -1;
        let valueToRemove = 0;
        // Iterate over all our currentMatches
        this.state.provisionalMatches.forEach((count, curIndex) => {
            ///////////////////////
            // Our Algorithm //////
            //// Short, But Verbose
            ///////////////////////
            // To determine the ideal valueToRemove, let's think about what we want to end up with and work backwards.
            //
            // The optimal (non-endgame) strategy is to remove matches from some target row such that:
            //  - The nim-sum of all _remaining_ matches is 0;
            //  - i.e. x_0 ^ x_1 ^ x_target's remaining matches ^ ... ^ x_n = 0
            // 
            // Remark 0: 0 ^ x = x for any number x
            // Remark 1: x ^ x = 0 for any number x
            // 
            // One way of achieving our ideal move this is to ensure that: 
            //  - After modifying our target row, the number of remaining matches should be:
            //    (x_0 ^ x_1 ^ ... ^ x_n) many matches, since this value will XOR with our remaining matches 
            //    for a nimSum of 0;
            // Said another way:
            //  - Can we remove some 'n' matches from our target row such that
            //     x_target - n === (x_0 ^ x_1 ^ ... ^ x_n), for all x !== x_target
            //
            // Important question yet to be answered: Which row is our target row?!
            // 
            // To find x_target, we should iterate over all our rows and check the condition we described above.
            // Something like, for every row 'i' with matches 'x_i':
            // - Is there some number of matches 'n' s.t. 
            //   x_i - n === (x_0 ^ x_1 ^ ... ^ x_n) for all x !== x_i
            // 
            // We're looking for the valueToRemove, 'n', so if we move our terms around a bit, we might be done!
            // - n = 'x_i - (x_0 ^ x_1 ^ ... ^ x_n)' for all x !== x_i
            // 
            // Except, minor problem -- 'n' might be negative based on the formula above!
            // Consider matches [1,5,2]
            // Row one has x_0 = 1
            // nimSum of all rows except the first = 7
            // 1 - 7 = (-6)
            //
            // We can't remove a negative number of matches, or add more matches than the number we started with 
            // One way we can take this into account is by only considering scenarios in which:
            // - (x_i - n) < x_i
            // Said another way: 
            // - '(x_0 ^ x_1 ^ ... ^ x_n) for all x !== x_i' < x_i
            // By requiring this condition be met, we can ensure that our n is always > 0
            //
            // Great! So we have our necessary conditions to check for
            // We know how to derive n from '(x_0 ^ x_1 ^ ... ^ x_n) for all x !== x_i'
            // We just need to calculate: '(x_0 ^ x_1 ^ ... ^ x_n) for all x !== x_i'
            //
            // Remark 2: We know that our nimSum = (x_0 ^ x_1 ^ ... ^ x_n)
            // 
            // Combining remarks 0, 1 and 2, we can calculate '(x_0 ^ x_1 ^ ... ^ x_n) for all x !== x_i' by computing:
            // - x_i ^ nimSum
            // Proof of equality fully expanded: 
            // - x_i ^ x_0 ^ x_1 ^ ... ^ x_i ^ ... ^ x_n) | Expand nimSum
            // - x_i ^ x_i ^ x_0 ^ ... ^ x_n              | Chained Communitivity of ^ let's us move our x_i together
            // - 0 ^ x_0 ^ ... ^ x_n                      | From Remark 1, x_i ^ x_i === 0
            // - x_0 ^ ... ^ x_n for x !== x_i            | From Remark 0, x ^ 0 === x
            //
            // One last detail: once we find an optimal number of elements to remove, we can skip all the other rows
            // 
            // Putting it all together now, our algorithm is:
            // - For every row 'i' with matches 'x_i':
            //      - Compute 'x_0 ^ ... ^ x_n for x !== x_i' by performing x_i ^ nimSum
            //      - Check that x_0 ^ ... ^ x_n for x !== x_i is less that x_i
            //      - If it is, 'n' is equal to 'x_i - (x_0 ^ ... ^ x_n for x !== x_i)',
            //      - Make note that we've got an optimal move to make, so we can skip through all other rows
            //  - Return the row of interest's index 'i' and the value 'n' to remove 

            if (index !== -1) return;
            // If the result of count XOR nimSum is < count, this is the row we can remove a value from! 
            if ((count ^ nimSum) < count) {
                // Track the index,
                index = curIndex;
                // And note our value to remove 
                valueToRemove = count - (count ^ nimSum);
            }
        });
        return [index, valueToRemove]; 
    }

    _AITurn= () =>{
        // Strategy can be broken up into two modes: Endgame and typical
        // First, check to see if we are in an endgame orientation - specifically, if there is <= 1 row left with more than one match
        const curMatches = this.state.initialMatchesOnTurn;
        const isEndGame = _.reduce(curMatches, (acc, count) => count > 1 ? acc + 1 : acc, 0) <= 1;
        console.log('isEndGame: ', isEndGame);
        if (isEndGame) {
            // Calc the # of remaining turns by looking at the non-zero rows
            const remainingTurns = _.reduce(curMatches, (acc, count) => count > 0 ? acc + 1 : acc, 0);
            console.log('remainingTurns: ', remainingTurns);
            // Get the max value 
            const maxVal = _.max(curMatches);
            const indexOfMax = curMatches.indexOf(maxVal)
            
            const newMatches = [...curMatches];
            // Get the number of matches to remove
            const matchesToRemove = (maxVal - (remainingTurns % 2));
            // If the matchesToREmove is zero, the AI cannot win; just remove the maxVal
            if (matchesToRemove === 0) { 
                newMatches[indexOfMax] -= maxVal;
            } else { 
                newMatches[indexOfMax] -= matchesToRemove;
            }
            this.finalizeTurn(newMatches);
        } else { 
            // First, get the nim sum of all the remaining match-rows, i.e. XOR all counts together
            const nimSum = _.reduce(curMatches, (nimSum, count) => count ^ nimSum, 0);
            // console.log('nimSum: ', nimSum);
            // Then, get the next value to remove and the index from the nimSum - if there is such a move
            let [index, valueToRemove] = this._getOptimalMoveBasedOnSum(nimSum);
            if (index === -1) {
                // If there's on optimal move, pick a random row, pick a random number of matches;
                const validRowsIndexes = _.reduce(curMatches, (acc, numberOfMatches, i) => {
                    if (numberOfMatches === 0) {
                        return acc;
                    } else {
                        acc.push(i);
                        return acc;
                    }
                }, []);
                // Pick a randomRow by index
                index = validRowsIndexes[Math.floor(Math.random()*(validRowsIndexes.length))];
                // Get the matches in that row by looking at the curMatches array
                const randomRowMatchCount = curMatches[index];
                // To get a random amount of matches to remove, use random to seed a valu between 0..1
                // Multiply that my the matchCount to map it between 0...matchCount - 1; 
                // Add one to make sure we remove between 1...matchCount many matches.
                valueToRemove = Math.floor(Math.random()*randomRowMatchCount) + 1
            }
            const newMatches = [...curMatches];
            newMatches[index] -= valueToRemove;
            this.finalizeTurn(newMatches)
        }
    }

    // Finalize a turn by updating matches (using optional arg or current provisional) and switching to the next player
    finalizeTurn = (optionalMatches=null) => {
        // New matches are either provided matches or the provisional matches
        const newMatches = optionalMatches ? optionalMatches : this.state.provisionalMatches
        const nextPlayer = this._nextPlayer();
        this.setState({
            initialMatchesOnTurn: newMatches,
            provisionalMatches: newMatches,
            isFirstTurn: false,
            currentPlayer: nextPlayer
        });
    }

    // Restarts the game to it's initial configuration
    restartGame = () => {
        // Get the inital matches array
        const initialMatches = this._initializeMatchesArray();
        this.setState({
            provisionalMatches: initialMatches,
            initialMatchesOnTurn: initialMatches,
            isFirstTurn: true,
            // Starting player is based on whether or not the userGoesFirst
            currentPlayer: this.userGoesFirst ? this.PLAYER_USER : this.PLAYER_AI
        });
    }

    handleForceAIMoveButton = () => { 
        this.setState({
            currentPlayer: this.PLAYER_AI
        });
    }

    render() {
        const hasChangeOccurred = !_.isEqual(this.state.provisionalMatches, this.state.initialMatchesOnTurn);

        // If there's a winner, redirect to the winner page
        if (this.state.winner) { 
            return <Redirect push to={{
                pathname: "/gameover",
                search: "?winner=" + this.state.winner
            }}/>
        }
        // Else, just render the current game
        return (
            <div id="match-game-container">
                {/* TODO: Make this use the application state to determine the current version of the game that's loaded */}
                <MatchesOriginal
                    provisionalMatches={this.state.provisionalMatches}
                    initialMatchesOnTurn={this.state.initialMatchesOnTurn}
                    incrementMatches={this.incrementMatches}
                    decrementMatches={this.decrementMatches}
                    hasChangeOccurred={hasChangeOccurred}
                    />
                <TurnActionBar
                    isFirstTurn={this.state.isFirstTurn}
                    restartGame={this.restartGame}
                    resetTurn={this.resetTurn}
                    finalizeTurn={this.finalizeTurn}
                    handleForceAIMoveButton={this.handleForceAIMoveButton}
                    hasChangeOccurred={hasChangeOccurred}
                />
            </div>
        );
    }
}