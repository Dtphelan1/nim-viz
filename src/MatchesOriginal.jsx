import React, { Component, Fragment } from 'react';
import Match from "./Match.jsx";
import MatchModifiers from "./MatchModifiers.jsx";
import './MatchesOriginal.css'
import _ from 'lodash';
export default class MatchesOriginal extends Component {
    render () {
        const { matches, incrementMatches, decrementMatches } = this.props;
        return (
            <Fragment>
                {matches.map((count, i) => {
                    return (
                        <div className="match-row" key={i}>
                            <span className="matches-fixed-width-container">
                                {_.times(count, () => { 
                                    return <Match/>
                                })}
                            </span>
                            <MatchModifiers
                                currentMatch={i}
                                //TODO: Make this more generic
                                maxMatches={count === (1 + (i * 2))}
                                minMatches={count === 0}
                                incrementMatches={incrementMatches}
                                decrementMatches={decrementMatches}
                            />
                        </div>
                    );
                })}

            </Fragment>
        ); 
    }
}