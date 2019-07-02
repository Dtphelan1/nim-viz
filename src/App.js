import React, { Component } from 'react';
import MatchGame from './MatchGame/MatchGame.jsx'; 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './App.css';
import TitlePage from './TitlePage/TitlePage.jsx';
import TransitionRouteWrapper from './TransitionRouteWrapper/TransitionRouteWrapper.jsx';

class App extends Component {
    routerRender = ({location}) => { 
        const WrappedTitlePage = TransitionRouteWrapper(TitlePage)
        const WrappedLearnPage = TransitionRouteWrapper(MatchGame)
        const WrappedPlayPage = TransitionRouteWrapper(MatchGame)
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
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    }
    render() {
        return (
            <Router>
                <Route render={this.routerRender}/>
            </Router>
        );
    }
}

export default App;
