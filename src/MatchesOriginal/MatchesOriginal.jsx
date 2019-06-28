import React from 'react';
import Match from "../Match/Match.jsx";
import MatchModifiers from "../MatchModifiers/MatchModifiers.jsx";
import './MatchesOriginal.css'
import _ from 'lodash';
export default function MatchesOriginal (props) {
    const { provisionalMatches, initialMatchesOnTurn, incrementMatches, decrementMatches } = props;
    return (
        <div id="match-original-game-container">
            {provisionalMatches.map((count, i) => {
                return (
                    <div className="match-row" key={i}>
                        <span className="matches-fixed-width-container">
                            {_.times(count, (i) => { 
                                return <Match key={i}/>
                            })}
                        </span>
                        <MatchModifiers
                            currentMatch={i}
                            //TODO: Make this more generic
                            maxMatches={count === initialMatchesOnTurn[i]}
                            minMatches={count === 0}
                            incrementMatches={incrementMatches}
                            decrementMatches={decrementMatches}
                        />
                    </div>
                );
            })}
        </div>
    );
}