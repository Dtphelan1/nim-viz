import React from 'react';
import LinkButton from '../LinkButton/LinkButton.js';

export default function WinPage(props) {
    return (
        <React.Fragment>
            <div className="jumbotron text-center">
                <h1 className="display-3 ">Congratulations</h1>
                <h1 className="display-4 mb-5">You beat the AI!</h1>
            </div>
            <div className="d-flex justify-content-around m-5" id="nav-btns">
                <LinkButton pathname="/play" displayText="Play Again"/>
                <LinkButton pathname="/" displayText="Back Home"/>
            </div>
        </React.Fragment>
    );
}