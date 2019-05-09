import React, { Component, Fragment } from 'react';
import Match from "./Match.jsx";
import './MatchesOriginal.css'
import _ from 'lodash';
export default class MatchesOriginal extends Component {
    render () {
        const { matches } = this.props;
        return (
            <Fragment>
                {matches.map((count, i) => {
                    return (
                        <div className="match-row" key={i}>
                            {_.times(count, () => { 
                                return <Match/>
                            })}
                        </div>
                    );
                })}

            </Fragment>
        ); 
    }
}