import React from 'react'; 
import LinkButton from '../LinkButton/LinkButton.js'; 
export default function TutorialAboutPage(props) { 
    return (
        <div className="container jumbotron">
            <div className="row">
                <div className="col-12">
                    <h1>
                        About Nim
                    </h1>
                </div>
            </div>
            <div className="row p-2 align-items-center">
                <div className="col-md-4 p-2 text-center">
                    <img src="nimrod.png" style={{objectFit: "cover", height: "auto", maxWidth: "200px"}}/>
                </div>
                <div className="col-md-8 p-2">
                    <span>
                        <strong>Nim</strong> is a <a href="https://en.wikipedia.org/wiki/Mathematical_game">mathematical game</a>, specifically a <a href="https://en.wikipedia.org/wiki/Game_of_strategy">game of strategy</a> in which two players take turns removing objects from distinct heaps or piles. 
                        On each turn, a player must remove at least one object, and may remove any number of objects provided they all come from the same heap/row. 
                        References to Nim date back to the 16th century, but it wasn't until 1901 that Charles Bouton deconstructing the optimal strategy of the game. 
                        Depending on the version being played, the goal of the game is either to avoid taking the last object, or to take the last object. 
                        This website uses the typical gameplay format - <em>misère</em> - in which the player to take the last object loses. 
                    </span>
                </div>
            </div>
            <div className="row p-2 align-items-center">
                <div className="col-md-4 order-0 order-md-2 p-2 text-center">
                    <img src="nim-setup.png" style={{objectFit: "cover", height: "auto", maxWidth: "200px"}}/>
                </div>
                <div className="col-md-8 order-1 col-pull-md-8 p-2">
                    <span>
                        Here you'll see the typical set up for a round of Nim. 
                        Rows of matches are set up on top of one another, each row adding two to the previous. 
                        The game starts by removing some number of matches from a single row. 
                        To win, you want to trap your opponent into taking the last piece.
                        Think you're ready to jump right in? 
                        Click the play button to start.
                        If you're interested in reading a bit more first, check out the winning strategy page!
                    </span>
                </div>
            </div>
            <div className="row p-5 justify-content-around">
                <LinkButton pathname="/play" displayText="Play Now"/>
                <LinkButton pathname="/winning" displayText="Learn More"/>
            </div>
        </div>
    );
}