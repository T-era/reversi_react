import React, { useState } from 'react';
import Rev, { Score, Stone } from '../../rev';

import ScoreBoard from './ScoreBoard';
import Footer from './Footer';
import Cells from '../Cells';
import './Gaming.scss';

interface Props {
  rev :Rev;
  onSuspended :() => void;
}
function Gaming(props :Props) {
  let { rev, onSuspended } = props;
  let [{}, setState] = useState({});

  const onPlayMoved = () => {
    setState({});
  }

  return (
    <div className="gaming">
      <div className='main'>
        <Cells
          rev={rev}
          onPlayMoved={onPlayMoved} />
        <Footer
          nextPlayer={rev.nextPlayer}
          onNextPlayerChanging={() => {
            rev.skipPlayer();
            setState({});
          }}
          onSuspended={onSuspended} />
      </div>
      <ScoreBoard score={rev.score}/>
    </div>
  );
}

export default Gaming;
