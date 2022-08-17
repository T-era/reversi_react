import './App.scss';
import React, {useState} from 'react';
import Rev from './rev';

import Cells from './components/Cells';
import Side from './components/Side';

const rev = new Rev();

function App() {
  let [{ score, nextPlayer, initialized }, setState] = useState({
    score: rev.score,
    nextPlayer: rev.nextPlayer,
    initialized: false,
  });

  const onNextPlayerChanging = () => {
    rev.skipPlayer();
    setState({
      score,
      initialized,
      nextPlayer: rev.nextPlayer
    });
  };
  const onScoreChanged = () => {
    setState({
      score: rev.score,
      initialized,
      nextPlayer: rev.nextPlayer
    });

  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <div className="field">
          <Cells
            rev={rev}
            onPlayMoved={() => {
              onScoreChanged();
            }} />
        </div>
        <Side
          rev={rev}
          score={score}
          nextPlayer={nextPlayer}
          onNextPlayerChanging={onNextPlayerChanging}
          onGameInitialized={()=>{
            setState({
              score: rev.score,
              nextPlayer: rev.nextPlayer,
              initialized: true
            });
          }} />
      </main>
    </div>
  );
}

export default App;
