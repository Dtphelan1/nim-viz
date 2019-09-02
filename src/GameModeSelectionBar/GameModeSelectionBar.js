import React from 'react'; 

export default function GameModeSelectionBar(props) {
    const { possibleModes, handleModeSelection } = props;

    return (
        <div class="btn-group" role="group" aria-label="Mode Selection Menu">
            {possibleModes.map((mode) => {
                return (
                    <button type="button" class="btn btn-secondary" onClick={()=>handleModeSelection(mode.type)}>{mode.displayText}</button>
                );
            })}
            <button type="button" class="btn btn-secondary">Middle</button>
            <button type="button" class="btn btn-secondary">Right</button>
        </div>
    );
}