import React from 'react';
import LinkButton from '../LinkButton/LinkButton.js';
import './TitlePage.css';

export default function TitlePage() { 
    return (
        <section id="title-page">
            <div className="jumbotron">
                <h1 className="display-3 text-center">Digital Nim</h1>
                <h2 className="display-4 text-center">Playing Parlor Games Against AI</h2>
            </div>
            <div id="title-buttons">
                <LinkButton pathname="/learn" displayText="Learn More"/>
                <LinkButton pathname="/play" displayText="Start Playing"/>
            </div>
        </section>
    );
}