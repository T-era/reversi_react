import React, { useState } from 'react';
import Rev, { requestThink, skipPlayer, Turning } from '../../rev';
import { PlayMembers } from '../../algorithm';

import ScoreBoard from './ScoreBoard';
import Footer from './Footer';
import Cells from '../Cells';
import './Gaming.scss';

interface Props {
  rev :Rev;
  players :PlayMembers;
  onSuspended :(rev :Rev) => void;
}
function Gaming(props :Props) {
  let { onSuspended } = props;
  let [{rev, turning}, setState] = useState({
    rev: props.rev,
    turning: null as Turning|null
  });

  // 次がAIの場合
  setTimeout(() => {
    requestThink(rev, (nextRev) => {
      setState({ rev: nextRev, turning: null });
    })
  }, 0);

  const onPlayMoved = (rev :Rev, turning :Turning|null) => {
    setState({rev, turning});
  }

  return (
    <div className="gaming">
      <div className='main'>
        <Cells
          rev={rev}
          turning={turning}
          onChanged={onPlayMoved} />
        <Footer
          nextPlayer={rev.nextPlayer.color}
          onNextPlayerChanging={() => {
            const nextRev = skipPlayer(rev);
            setState({ rev: nextRev, turning: null });
          }}
          onSuspended={() => onSuspended(rev)} />
      </div>
      <ScoreBoard score={rev.score}/>
    </div>
  );
}

export default Gaming;
