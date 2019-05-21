import React from 'react';

export default function Match() {
    const dimension = 75;
    return (
        <img
            src="matchstick.png"
            style={{
                'width': dimension,
                'height': dimension,
            }}
            alt="One of the matches in this row"
        />
    );
}