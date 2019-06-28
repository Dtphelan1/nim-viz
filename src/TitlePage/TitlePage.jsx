import React from 'react';
import { Link } from 'react-router-dom';
import './TitlePage.css';

export default function TitlePage() { 
    return (
        <section id="title-page">
            <h1>NIM</h1>
            <div id="title-buttons">
                <Link to="/learn">
                    <button className="btn btn-lg btn-primary">
                        Learn
                    </button>
                </Link>
                <Link to="/play">
                    <button className="btn btn-lg btn-primary">
                        Play
                    </button>
                </Link>
            </div>
        </section>
    );
}