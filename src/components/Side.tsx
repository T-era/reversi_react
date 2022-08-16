import React, { useState } from 'react';

import Rev from '../rev';

import InitModal from './InitModal';
import './Side.scss';

interface Props {
  rev :Rev;
}
function Side(props :Props) {
  const [state, setState] = useState({
    isInitDialogOpen: false,
    score: {
      black: 0,
      white: 0
    }
  });
  const rev = props.rev;
  rev.setScoreListener((score) => {
    setState((state) => {
      state.score = score;
      return state;
    });
  });
  const initModalListener = (isOpen :boolean) => {
    setState((state) => {
      return { ...state, isInitDialogOpen: isOpen };
    });
  };

  return (
    <>
      <InitModal isOpen={state.isInitDialogOpen} initModalListener={initModalListener} rev={rev} />
      <div className="side">
        <div className='control'>
          <button onClick={() => setState((state) => {
            return { ...state, isInitDialogOpen: true };
          })}>Start</button>
          <button onClick={() => rev.skipPlayer()}>Skip</button>
        </div>
        <details className='score'>
          <summary>Score</summary>
          <table>
            <tbody>
              <tr>
                <th>Black: </th>
                <td>{state.score.black}</td>
              </tr>
              <tr>
                <th>White: </th>
                <td>{state.score.white}</td>
              </tr>
            </tbody>
          </table>
        </details>
      </div>
    </>
  );
}

export default Side;
