import React, { useState } from 'react';

import Rev, { Score, Stone } from '../rev';

import InitModal from './InitModal';
import './Side.scss';
import imageBlack from './img/stone_black.svg';
import imageWhite from './img/stone_white.svg';
import imageEmpty from './img/empty.svg';

interface Props {
  rev: Rev;
  score :Score;
  nextPlayer :Stone.Black|Stone.White;

  onNextPlayerChanging :()=>void;
  onGameInitialized :()=>void;
}
function Side(props :Props) {
  const { score, nextPlayer } = props;
  const [{ isInitDialogOpen }, setState] = useState({
    isInitDialogOpen: false,
  });
  const onGameInitialized = () => {
    props.onGameInitialized();
    setState({ isInitDialogOpen: false });
  };
  let imageNextSrc = showNextPlayer(nextPlayer);

  return (
    <>
      <InitModal
        rev={props.rev}
        isOpen={isInitDialogOpen}
        onGameInitialized={onGameInitialized} />
      <div className="side">
        <div className='control'>
          <button onClick={() => setState((state) => {
            return { ...state, isInitDialogOpen: true };
          })}>Start</button>
        </div>
        <details className='score'>
          <summary>Score</summary>
          <table>
            <tbody>
              <tr>
                <th>Black: </th>
                <td>{score.black}</td>
              </tr>
              <tr>
                <th>White: </th>
                <td>{score.white}</td>
              </tr>
            </tbody>
          </table>
        </details>
        <dl id='next'>
          <dt>next:</dt>
          <dd>
            <img src={imageNextSrc} className='next_stone' alt='next' />
            <button onClick={() => {
                props.onNextPlayerChanging();
              }}>Skip</button>
          </dd>
        </dl>
      </div>
    </>
  );
}

export default Side;

function showNextPlayer(nextPlayer :Stone) {
  switch(nextPlayer) {
    case Stone.Black: return imageBlack;
    case Stone.White: return imageWhite;
  }
  return imageEmpty;
}