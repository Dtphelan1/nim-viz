import React from 'react';
import './Match.css'

export default function Match(props) {
    if (props.removed) {
        return (
            <div
                className="match removed"
                alt="One of the matches in this row was removed"
            />
        );
    }
    return (
        <img
            src="matchstick-2.png"
            className="match"
            alt="One of the matches in this row"
        />
    );
}