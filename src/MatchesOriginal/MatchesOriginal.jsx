import React from 'react';
import Match from "../Match/Match.jsx";
import MatchModifiers from "../MatchModifiers/MatchModifiers.jsx";
import './MatchesOriginal.css'
import _ from 'lodash';
export default function MatchesOriginal (props) {
    const { provisionalMatches, initialMatchesOnTurn, incrementMatches, decrementMatches, hasChangeOccurred } = props;
    return (
        <React.Fragment>
            {provisionalMatches.map((count, i) => {
                // For every row of matches, if a change has occured, we want to lock any rows that aren't in the process of being changed 
                // This ensures that only one row can be modified at a given time
                const hasRowChanged = (count !== initialMatchesOnTurn[i])
                const isRowLocked = hasChangeOccurred && !hasRowChanged
                return (
                    <div className={"match-row" + (hasRowChanged ? " row-changed" : "")} key={i}>
                        <span className="matches-fixed-width-container">
                            {_.times(count, (i) => { 
                                return <Match key={i}/>
                            })}
                            {_.times(initialMatchesOnTurn[i] - count, (i) => { 
                                return <Match key={i} removed={true}/>
                            })}
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
        </React.Fragment>
    );
}