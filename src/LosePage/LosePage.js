import React from 'react';
import LinkButton from '../LinkButton/LinkButton.js';

export default function LosePage(props) {
    return (
        <React.Fragment>
            <div className="jumbotron text-center">
                <h1 className="display-3 ">Whoops</h1>
                <h1 className="display-4 mb-5">Better luck next time</h1>
            </div>
            <div className="d-flex justify-content-around m-5" id="nav-btns">
                <LinkButton pathname="/" displayText="Back Home"/>
                <LinkButton pathname="/play" displayText="Play Again"/>
            </div>
        </React.Fragment>
    );
}