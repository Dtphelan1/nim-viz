import React from 'react'; 
import { Link } from 'react-router-dom';

export default function LinkButton(props) {
    const { pathname, displayText } = props;
    return (
        <Link to={pathname}>
            <button className="btn btn-lg btn-primary">
                {displayText}
            </button>
        </Link>
    )
}