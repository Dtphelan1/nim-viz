import React from 'react';
import './TurnActionBar.css'

export default function TurnActionBar(props) {
    const { restartGame, finalizeTurn, hasChangeOccurred, isFirstTurn, handleForceAIMoveButton } = props;

    function handleRestartClick(e) { 
        e.preventDefault();
        restartGame();
    }
    function handleDoneClick(e) { 
        e.preventDefault();
        finalizeTurn();
    }
    function handleAIMoveClick(e) { 
        e.preventDefault();
        handleForceAIMoveButton();
    }

    return (
        <>
            <div id="turn-action-bar" className="d-none d-sm-flex">
                <button type="button" className="btn btn-primary" onClick={handleAIMoveClick} disabled={!isFirstTurn}>
                    AI Moves First
                </button>
                <button className="btn btn-primary" onClick={handleRestartClick}>
                    Restart Game
                </button>
                <button className="btn btn-primary" disabled={!hasChangeOccurred} onClick={handleDoneClick}>
                    Turn Finished
                </button>
            </div> 
            {/* For display on small-screen */}
            <div id="turn-action-bar" className="d-flex d-sm-none">
                <button type="button" className="btn btn-sm btn-primary" onClick={handleAIMoveClick} disabled={!isFirstTurn}>
                    AI First
                </button>
                <button className="btn btn-sm btn-primary" onClick={handleRestartClick}>
                    Restart
                </button>
                <button className="btn btn-sm btn-primary" disabled={!hasChangeOccurred} onClick={handleDoneClick}>
                    Finished
                </button>
            </div> 
        </>
    );
}