# P1 

**Nim** is a [mathematical](https://en.wikipedia.org/wiki/Mathematical_game) [game of strategy](https://en.wikipedia.org/wiki/Game_of_strategy) in which two players take turns removing objects from distinct heaps or piles. On each turn, a player must remove at least one object, and may remove any number of objects provided they all come from the same heap/pile. Depending on the version being played, the goal of the game is either to avoid taking the last object, or to take the last object. Nim is typically played as a *misère* game, in which the player to take the last object loses. This is the version you will be playing today.

(Photo from wikipedia associated with nim.)

# P2 

This is what the typical set up of a nim-game looks like. A variety of matches are present. You will start removing some number of matches from a single row. When you're done with your turn, hit "finished". Think about how you might trap your opponent into taking the last piece, and play a few rounds for practice if you'd like. 

(allow game to continue for a while)

# P3 

Having trouble discerning the winning strategy? Don't fret: though references to the game date back to the 16th century, it took until 1901 for Charles Bouton to deconstruct the game fully. The secret to winning: you must always take as many matchsticks as possible so that the “Nim sum” of the rows is zero. That is, until the very end of the game, where you always want to leave exactly one match for your opponent to take. While this is fine and good, we still don't know what a nim-sum is.... 

(photo of bouton)

# P4 

Beyond choosing which matches to remove, reader, this is the moment you need to make a choice like you might in a fluid conversation. There's a simple answer to how to play nim, and a detailed (some might say: boring) answer. Feel free to choose whichever you would like - I promise I won't be offended either way: 

# Easy: 

To win Nim is simple: Count the matchsticks in each row, and convert those numbers into multiples of 4, 2 and 1. From there, for each column of multiples, determine which columns have an odd number. Your move should remove matches so that each column has an even number (or 0) instances of each multiple. Armed with this information, try to beat the computer again, and go to the next page when you're ready.

# Detailed: 

The nim-sum goes by a few names - for those who *don't* do combinatorial game theory, the most common label is "exclusive or". "Exclusive or", XOR for short, is usually the "or" you're thinking of when speaking conversational english. When someone asks you if you want a water or a soda with your order, they usually mean - "Hey, you can have either a water, or a soda. Which of the two would you like?".   

(footnote one: Easy way to annoy your mathematically or engineering inclined friends: whenever one of them asks if you want one thing or the other, answer "yes" and watch as they either chuckle in shared understanding, or slowly begin to unravel your shared relationship. And that's an inclusive or there, not an XOR...) 

# P5 

XOR rears it's head in everything from philosophy, electrical engineering, computer science and matchstick parlor games. Since XOR is a decision between two things - either this, or that, but not both - we need to convert our matches into something that only has two choices. We can do this easily in binary! Instead of using the digits 0-9 to represent numbers, we just use 0 and 1. Similarly instead of a Ten's place and a Hundred's place, we have a Two's place, a Four's place, an Eight's place and so on. When we XOR two numbers, we're looking at each column and asking: for this column, is there only a single 1? If so, we put a 1 as our result. Otherwise, we put a 0. 

# P6   

Last step, I promise. For Nim, we will use XOR to combine all our rows into a single value. To do, we take the result of XOR'ing one row, and XOR it with the next. The final result - our nim sum - is how many matches we need to remove in order to beat our opponent. Convert that new number into binary, and remove that number from some row. Armed with the winning strategy, why don't you try to beat the AI one more time... And then go to the next page when you're ready.

(footnote 2: Binary is the fundamental language that computers speak, and is a useful representation of information for a number of reasons. One reason is how well it translates into simple state machines like you would find in a transistor, where a 0 in an informational sense can be represented with a transistor carrying no charge; a 1 is represented by a transistor carrying charge. Nifty, yes, but we have wandered quite a way from the original point - how do we use binary and XOR to beat a computer at Nim? )

# Final 

The final piece of vital information, which you hopefully discerned after trying to beat the AI: The person who goes first *cannot* win UNLESS the opponent messes up the optimal strategy. While this happens often when you're in an 18th century French parlor playing with drunk aristocrats, it's pretty uncommon when you're playing against a computerized algorithm. Go ahead, force the AI to go first, and see how that changes things - remember, you want the opponent to be the *last* person to take a match. You'll have to change up your play style in the last few moves, but you'll figure it out. No more tricks! 



# Final Plus 1: 

Alright - one more trick. In addition to being an interesting foray into logic and game theory, one thing I find so neat about Nim is how well it demonstrates the importance of how information is visualized. Having this game computerized means we don't need to play the game with just heaps matches. Instead, we can align the matches one way or another. We can visualize the game as a bunch of typical, decimal numbers. We can visualize the game as binary to start with, instead of converting matches to decimal numbers to binary. Go ahead and change the game-mode to your liking, and see which one visualizations help you finish first! 

# About 

Hope you've enjoyed playing this game and hopefully learning a bit about Nim, logical operations, and the impact that a visualization can have on how easy it is to process information. If you think this project was neat, send me a message on Twitter letting me know, or if you want to learn more about what the code for this looks like take a peak at my Github page. 