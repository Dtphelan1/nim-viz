import React from 'react';

export default function ForceAIMoveButton(props) {
    return (
        <button type="button" className="btn btn-outline-primary" onClick={props.handleForceAIMoveButton} disabled={!props.isFirstTurn}>AI Moves First</button>
    );
}