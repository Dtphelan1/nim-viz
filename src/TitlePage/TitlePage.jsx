import React from 'react';
import LinkButton from '../LinkButton/LinkButton.js';
import './TitlePage.css';

export default function TitlePage() { 
    return (
        <section id="title-page">
            <h1>NIM</h1>
            <div id="title-buttons">            
                <LinkButton pathname="/learn" displayText="Learn More"/>
                <LinkButton pathname="/play" displayText="Start Playing"/>
            </div>
        </section>
    );
}