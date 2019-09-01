import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './MatchModifiers.css';
export default function MatchModifiers (props) {
    const { incrementMatches, decrementMatches, currentMatch, minMatches, maxMatches, isRowLocked} = props; 
    return (
        <span className="match-modifier-btns">
            <button
                className="btn btn-primary btn-sm"
                disabled={maxMatches || isRowLocked}
                onClick={() => incrementMatches(currentMatch)}
            >
                <FontAwesomeIcon icon={faPlus}/>
            </button>
            <button
                className="btn btn-primary btn-sm"
                disabled={minMatches || isRowLocked}
                onClick={() => decrementMatches(currentMatch)}
            >
                <FontAwesomeIcon icon={faMinus}/>
            </button>
        </span>
    );
}