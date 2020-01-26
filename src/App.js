import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TransitionRouteWrapper from './TransitionRouteWrapper/TransitionRouteWrapper.jsx';
import { TitlePage, GameOverPage, ErrorPage, AboutPage, WinningStrategyPage, MatchGamePage } from './Pages'
import NimTopBar from './NimTopBar/NimTopBar.js'
import ScrollToTop from './ScrollToTop.js'
import './App.css';

class App extends Component {
    constructor(props) { 
        super(props);
    }


    routerRender = ({location}) => { 
        const WrappedTitlePage = TransitionRouteWrapper(TitlePage)
        const WrappedGameOverPage = TransitionRouteWrapper(GameOverPage)
        const WrappedAboutPage = TransitionRouteWrapper(AboutPage)
        const WrappedWinningStrategyPage = TransitionRouteWrapper(WinningStrategyPage)
        const WrappedPlayPage = TransitionRouteWrapper(MatchGamePage)
        const WrappedErrorPage = TransitionRouteWrapper(ErrorPage)
        return (
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={1000}
                >
                    <Switch location={location}>
                        <Route exact path="/" component={WrappedTitlePage}/>
                        <Route path="/learn" component={WrappedAboutPage}/>
                        <Route path="/winning" component={WrappedWinningStrategyPage}/>
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
                <ScrollToTop>
                    <NimTopBar/>
                    <Route render={this.routerRender}/>
                </ScrollToTop>
            </Router>
        );
    }
}

export default App;
