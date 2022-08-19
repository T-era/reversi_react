import { Stone } from '../../rev';

import imageBlack from '../img/stone_black.svg';
import imageWhite from '../img/stone_white.svg';
import imageEmpty from '../img/empty.svg';
import './Footer.scss';

function showNextPlayer(nextPlayer :Stone) {
    switch(nextPlayer) {
      case Stone.Black: return imageBlack;
      case Stone.White: return imageWhite;
    }
    return imageEmpty;
}

interface Props {
    nextPlayer :Stone;
    onNextPlayerChanging :()=>void;
    onSuspended :()=>void;
}
export default function ScoreBoard(props :Props) {
    let { nextPlayer, onNextPlayerChanging, onSuspended } = props;
    let imageNextSrc = showNextPlayer(nextPlayer);
    return (
      <div className='footer'>
        <div className='next'>
          <img src={imageNextSrc} className='next_stone' id='next_stone' alt='next' title='next' />
          <button onClick={() => {
              onNextPlayerChanging();
            }}>Skip</button>
        </div>
        <button onClick={onSuspended}>Menu</button>
      </div>
    )
}