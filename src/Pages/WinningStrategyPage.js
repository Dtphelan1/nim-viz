import React, {useState } from 'react'; 
export default function WinningStrategyPage(props) { 
    const [finalInformationReveal, setFinalInformationReveal] = useState(false);

    return (
        <div className="container jumbotron">
            <div className="row">
                <div className="col-12">
                    <h1>
                        Winning At Nim
                    </h1>
                </div>
            </div>
            <div className="row p-2 align-items-center">
                <div className="col-12 p-2">
                    <p>
                        The secret to winning Nim is pretty straightforward: 
                        to win, must always take as many matchsticks as possible so that the “Nim Sum” of the rows is zero. 
                        The complicated part can be understanding what "Nim Sum" means.
                    </p>
                    <p>
                        A Nim Sum is the "Exclusive Or", XOR for short, of all the numbers of matches together.
                        For those who aren't familar with XOR, think of it as the "or" you're thinking of when speaking conversational english. 
                        When someone asks you if you want a water or a soda with your order they usually mean - "Hey, you can have either a water, or a soda. Which of the two would you like?".
                        That's what Excluive Or means - one or the other, but not both.
                    </p>
                    <p>
                        XOR rears it's head in everything from philosophy, electrical engineering, computer science and matchstick parlor games.
                        Since XOR is a decision between two things we need to convert the number of matches in each row into <a href='https://en.wikipedia.org/wiki/Binary_number'>binary</a>.
                        Instead of using the digits 0-9 to represent numbers, we just use 0 and 1. 
                        Similarly instead of a Ten's place and a Hundred's place, we have a Two's place, a Four's place, an Eight's place and so on. 
                        When we XOR two numbers, we're looking at each column's place for both numbers - the One's, Twos', Four's, Eight's -  and asking: 
                        for this column, is there only a single 1? 
                        If so, we put a 1 as our result. 
                        Otherwise, we put a 0. 
                    </p>
                    <p>
                        When calculating the Nim Sum of the current game, we XOR <i>all of our rows of matches</i>.
                        But XOR only takes numbers at a time - how can we XOR all our rows together? 
                        All we do is take the result of that first XOR, and use that as one of othe numbers in our next XOR.
                        So if we wanted to XOR 7, 2 and 3 together - 111, 010 and 011 - we'd XOR 111 and 010 first, which yields 101, or 5.
                        Then we'd XOR 101 with 011, producing 110, or 6. 
                        A heuristic for quickly doing this over multiple rows is to, for each column, see if there are an even or odd number of 1's.
                        If it's even, ultimate value for that column will be 0. 
                        If odd, it will be 1. 
                    </p>
                    <p>
                        Now that we understand XOR and how to caluclate a Nim Sum for a given list of numbers, let's think about the winning strategy is again. 
                        Our goal is that, at the end of our turn, the Nim Sum should be zero.
                        To do so, we can remove matches from some row equal to the current Nim Sum.  
                        So using XOR to combine all our rows into a single value, that value is how many matches we need to remove in order to beat our opponent. 
                    </p>
                    <p>
                        With this, you should be able to win the game if you're ready. 
                        But there is one more important piece of information that you might need... 
                        You should <a href='/play'>try to play first</a> and see if you can figure out what it is.
                        If you're still in need of a bit more help, click here for more.
                    </p>
                    <p className={!finalInformationReveal ? "" : "d-none"} onClick={() => setFinalInformationReveal(!finalInformationReveal)} style={{cursor: "pointer"}}>
                        <i>
                            Click here if you're ready to see the final piece of information
                        </i>
                    </p>
                    <p className={finalInformationReveal ? "" : "d-none" }>
                        The final piece of vital information, which you hopefully discerned after trying to beat the AI: 
                        The person <b>who goes first cannot win unless their opponent</b> messes up the optimal strategy. 
                        While this happens often when you're in an 17th/18th century French parlor playing with drunk aristocrats, it's pretty uncommon when you're playing against a computerized algorithm. 
                        Go ahead, let the AI to go first, and see how that changes things. 
                        Remember, you want <i>the opponent</i> to be the <i>last</i> person to take a match. 
                    </p>
                </div>
            </div>
        </div>
    );
}