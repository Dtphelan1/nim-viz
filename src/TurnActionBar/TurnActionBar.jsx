import React from 'react';
import './TurnActionBar.css'
import ForceAIMoveButton from '../ForceAIMoveButton/ForceAIMoveButton';

export default function TurnActionBar(props) {
    const { restartGame, resetTurn, finalizeTurn, hasChangeOccurred, isFirstTurn, handleForceAIMoveButton } = props;

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
    function handleAIMoveClick(e) { 
        e.preventDefault();
        handleForceAIMoveButton();
    }

    return (
        <div id="turn-action-bar">
            <button className="btn btn-outline-primary" onClick={handleRestartClick}>Restart Game</button>
            <button className="btn btn-outline-primary" disabled={!hasChangeOccurred} onClick={handleResetClick}>Reset Turn</button>
            <button className="btn btn-outline-primary" disabled={!hasChangeOccurred} onClick={handleDoneClick}>Turn Finished</button>
            <ForceAIMoveButton
                isFirstTurn={isFirstTurn}
                handleForceAIMoveButton={handleAIMoveClick}
            />
        </div> 
    );
}