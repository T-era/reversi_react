import './App.scss';
import React, {useState} from 'react';

import Rev, { initialize } from './rev';
import { PlayMembers } from './algorithm';

import Setting from './components/Setting';
import Gaming from './components/Gaming';
import Header from './components/Header';


function App() {
  let [{ isOnGaming, initialized, players }, setState] = useState({
    isOnGaming: false,
    initialized: false,
    players: {black: null, white: null} as PlayMembers,
  });
  let [rev, setRev] = useState(null as (Rev|null));

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <main>
        { isOnGaming
          ? <Gaming
              rev={rev!}
              players={players}
              onSuspended={(rev)=>{
                setState({
                  isOnGaming: false,
                  initialized,
                  players,
                });
                setRev(rev);
              }}/>
          : <Setting
              initialized={initialized}
              onSettingsSubmitted={(settings)=>{
                setRev(
                  initialize(settings)
                );
              }}
              onClose={(newPlayMembers)=>{
                setState({
                  isOnGaming: true,
                  initialized: true,
                  players: newPlayMembers === null ? players : newPlayMembers,
                });
              }}/>
        }
      </main>
    </div>
  );
}

export default App;
