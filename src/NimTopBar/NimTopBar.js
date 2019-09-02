import React from 'react'; 
import { Link } from 'react-router-dom';
import './NimTopBar.css';

export default function NimTopBar(props) {
    return (
        <React.Fragment>
            <nav className="navbar mb-2">
                <Link className="navbar-brand" to="/">Nim</Link>
            </nav>
            {/* <div className=>

            </div> */}
        </React.Fragment>
    );
}

