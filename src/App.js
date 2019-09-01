import React, { Component } from 'react';
import MatchGame from './MatchGame/MatchGame.jsx'; 
import GameOverPage from './GameOverPage/GameOverPage.js'; 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TitlePage from './TitlePage/TitlePage.jsx';
import TransitionRouteWrapper from './TransitionRouteWrapper/TransitionRouteWrapper.jsx';
import ErrorPage from './ErrorPage/ErrorPage.js';
import NimTopBar from './NimTopBar/NimTopBar.js'
import './App.css';

class App extends Component {
    routerRender = ({location}) => { 
        const WrappedTitlePage = TransitionRouteWrapper(TitlePage)
        const WrappedGameOverPage = TransitionRouteWrapper(GameOverPage)
        const WrappedLearnPage = TransitionRouteWrapper(MatchGame)
        const WrappedPlayPage = TransitionRouteWrapper(MatchGame)
        const WrappedErrorPage = TransitionRouteWrapper(ErrorPage)
        return (
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={1000}
                >
                    <Switch location={location}>
                        <Route exact path="/" component={WrappedTitlePage}/>
                        <Route path="/learn" component={WrappedLearnPage}/>
                        <Route path="/play" component={WrappedPlayPage}/>
                        <Route path="/gameover" component={WrappedGameOverPage}/>
                        <Route component={WrappedErrorPage}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    }
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <NimTopBar/>
                <Route render={this.routerRender}/>
            </Router>
        );
    }
}

export default App;
