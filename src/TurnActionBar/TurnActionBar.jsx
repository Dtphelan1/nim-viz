import React from 'react';
import './TurnActionBar.css'

export default function TurnActionBar(props) {
    const { restartGame, resetTurn, finalizeTurn, hasChangeOccurred } = props;

    function handleRestartClick(e) { 
        e.preventDefault();
        restartGame();
    }
    function handleDoneClick(e) { 
        e.preventDefault();
        finalizeTurn();
    }
    function handleResetClick(e) { 
        e.preventDefault();
        resetTurn();
    }

    return (
        <div id="turn-action-bar">
            <button className="btn btn-outline-primary" onClick={handleRestartClick}>Restart Game</button>
            <button className="btn btn-outline-primary" disabled={hasChangeOccurred} onClick={handleResetClick}>Reset Turn</button>
            <button className="btn btn-outline-primary" disabled={hasChangeOccurred} onClick={handleDoneClick}>Turn Finished</button>
        </div> 
    );
}