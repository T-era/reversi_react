import React, { useState } from 'react';
import './App.scss';
import Rev from './rev';

import Cells from './components/Cells';
import Side from './components/Side';

const rev = new Rev();

function App() {
  const cells = Cells(rev);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <div className="field">
          {cells}
        </div>
        <Side rev={rev} />
      </main>
    </div>
  );
}

export default App;
