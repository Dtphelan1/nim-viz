import React from 'react';
import queryString from 'query-string'
import WinPage from './WinPage.js'
import LosePage from './LosePage.js'
import ErrorPage from './ErrorPage.js'


export default function GameOverPage(props) {
    const values = queryString.parse(props.location.search)
    let GameOverScreen;
    if (values.winner === "AI") {
        GameOverScreen = LosePage;
    } else if (values.winner === "User"){ 
        GameOverScreen = WinPage;
    } else {
        GameOverScreen = ErrorPage;
    }
    return (
        <GameOverScreen/>
    );
}