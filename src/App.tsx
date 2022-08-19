import './App.scss';
import React, {useState} from 'react';

import Rev from './rev';

import Setting from './components/Setting';
import Gaming from './components/Gaming';
import Header from './components/Header';
// import Side from './components/Side';

const rev = new Rev();

function App() {
  let [{ isOnGaming, initialized }, setState] = useState({
    isOnGaming: false,
    initialized: false,
  });

  const onNextPlayerChanging = () => {
    rev.skipPlayer();
    setState({
      isOnGaming,
      initialized,
    });
  };
  const onScoreChanged = () => {
    setState({
      isOnGaming,
      initialized,
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <main>
        { isOnGaming
          ? <Gaming
              rev={rev}
              onSuspended={()=>{
                setState({
                  isOnGaming: false,
                  initialized,
                });
              }}/>
          : <Setting
              rev={rev}
              initialized={initialized}
              onClose={()=>{
                setState({
                  isOnGaming: true,
                  initialized: true,
                });
              }}/>
        }
      </main>
    </div>
  );
}

export default App;
