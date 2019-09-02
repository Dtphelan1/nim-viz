import React from 'react';

export default function GameModeSelectionBar(props) {
    const { possibleModes, handleModeSelection } = props;

    return (
        <div className="d-flex justify-content-center" id="mode-btns-container">
            <div className="btn-group" role="group" aria-label="Mode Selection Menu">
                {possibleModes.map((mode) => {
                    return (
                        <button type="button" key={mode.id} className="btn btn-primary" onClick={()=>handleModeSelection(mode.id)}>{mode.displaySmall}</button>
                    );
                })}
            </div>
        </div>
    );
}