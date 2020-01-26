import React from 'react';
import LinkButton from '../LinkButton/LinkButton.js';
import './TitlePage.css';

export default function TitlePage() { 
    return (
        <section id="title-page">
            <div className="container jumbotron">
                <h1 className="display-3 text-center">Digital Nim</h1>
                <p className="lead text-center">
                    Play this classic parlor game against an automated algorithm, taking turns removing matches from rows. 
                    <br/>
                    Whoever takes the last match loses!
                </p>
            </div>
            <div id="title-buttons">
                <LinkButton pathname="/learn" displayText="About Nim"/>
                <LinkButton pathname="/play" displayText="Start Playing"/>
            </div>
        </section>
    );
}