import React from "react"; 
import LinkButton from "../LinkButton/LinkButton";

export default function ErrorPage(props) {
    return (
        <React.Fragment>
            <div className="jumbotron text-center">
                <h1 className="display-3 ">Sorry</h1>
                <h1 className="display-4 mb-5">That's not a valid page...</h1>
            </div>
            <div className="d-flex justify-content-around m-5" id="nav-btns">
                <LinkButton pathname="/" displayText="Home"/>
                {/* <LinkButton pathname="/learn" displayText="Learn More"/> */}
                <LinkButton pathname="/play" displayText="Play Nim"/>
            </div>
        </React.Fragment>
    );
}