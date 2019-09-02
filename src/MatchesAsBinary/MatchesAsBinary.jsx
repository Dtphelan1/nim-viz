import React from 'react';
import MatchModifiers from "../MatchModifiers/MatchModifiers.jsx";

export default function MatchesAsBinary(props) {
    // Not only does this function convert the count, an int, into a binary representaion in string form, 
    // But it padds the left side with as many 0's as needed to match the maxNumber of Digits
    function _countInBinary(count) {
        const { numberOfRows } = props;
        const binaryRepOfMatches = count.toString(2);
        // Now we need to figure out the padding;
        const amountToPad = _maxDigitPlace2(numberOfRows) - binaryRepOfMatches.length;
        return _padWithZeros(count.toString(2), amountToPad);
    }

    // Given a string, pad it lengthOfPadding times with zeros on the left
    function _padWithZeros(strToPad, lengthOfPadding) {
        return "0".repeat(lengthOfPadding) + strToPad;
    }

    // Use the number of rows to determine the maximum number of digit places 
    // i.e. How many columns would be taken up if you wrote out the number in binary
    function _maxDigitPlace2(numberOfRows) {
        return Math.floor(Math.log2((numberOfRows * 2) - 1)) + 1;
    }

    const { provisionalMatches, initialMatchesOnTurn, incrementMatches, decrementMatches, hasChangeOccurred } = props;
    return (
        <div id="match-original-game-container">
            {provisionalMatches.map((count, i) => {
                // For every row of matches, if a change has occured, we want to lock any rows that aren't in the process of being changed 
                // This ensures that only one row can be modified at a given time
                const isRowLocked = hasChangeOccurred && (count === initialMatchesOnTurn[i]);
                return (
                    <div className="match-row" key={i}>
                        <span className="matches-fixed-width-container">
                            <h1>
                                {_countInBinary(count)}
                            </h1>
                        </span>
                        <MatchModifiers
                            currentMatch={i}
                            maxMatches={count === initialMatchesOnTurn[i]}
                            minMatches={count === 0}
                            incrementMatches={incrementMatches}
                            decrementMatches={decrementMatches}
                            isRowLocked={isRowLocked}
                        />
                    </div>
                );
            })}
        </div>
    );
}