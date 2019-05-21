import React from 'react';
import './TurnActionBar.css'

export default function TurnActionBar(props) {
    const { restartGame, resetTurn, finalizeTurn } = props;

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
        <div>
            <button className="btn btn-outline-primary" onClick={handleRestartClick}>Restart Game</button>
            <button className="btn btn-outline-primary" onClick={handleResetClick}>Reset</button>
            <button className="btn btn-outline-primary" onClick={handleDoneClick}>Done</button>
        </div> 
    );
}