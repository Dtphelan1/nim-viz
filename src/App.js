import React from 'react';
import MatchGame from './MatchGame/MatchGame.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>
        N I M 
      </h1>
      <p>
        This would be a description about how to play Nim and how different visualizations have impacts on how we process information.
      </p>

      <MatchGame/>
    </div>
  );
}

export default App;
