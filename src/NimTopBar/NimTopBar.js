import React from 'react'; 
import { Link } from 'react-router-dom';
import './NimTopBar.css';

export default function NimTopBar(props) {
    return (
        <>
            <nav className="navbar navbar-light navbar-expand-md mb-2">
                <Link className="navbar-brand" to="/">
                    <img src="matchstick-2.png"m alt="subtle matchstick logo to accompany brand name" className="pl-1 pr-1" style={{height: "30px" }}/>
                    Digital Nim
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link className="nav-link" to="/play">Play</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/learn">About Nim</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link" to="/winning">How to Win</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

