import React, {useState} from 'react';

import Rev, {Stone, ALine} from '../rev';
import './Cells.scss'


function Cells(rev :Rev) {
    return ALine.map((y) => {
        const line = CellLine(rev, y);
        const id = `l_${y}`;
        return <div className="CellLine" key={id}>{line}</div>
    });
}
function CellLine(rev :Rev, y :number) {
    return ALine.map((x) => {
        return Cell(rev, x, y);
    });
}
function Cell(rev :Rev, x :number, y :number) {
    const [{stone, additionalClass}, setState] = useState({ stone: Stone.None, additionalClass: '' });
    const style = {
        left: x * 60, top: y * 60
    };
    rev.setListenerAt({x, y}, (stone) => {
        setState((state) => { return { ...state, stone: stone }; });
    });
    const id = `c_${x}_${y}`;
    const onMouseOver = () => {
        if (rev.validateAt({x, y})) {
            setState((state) => { return {...state, additionalClass: 'can ' + rev.nextPlayer }; });
        }
    };
    const onMouseLeave = () => {
        setState((state) => { return {...state, additionalClass: ''}});
    }
    const onClick = () => {
        const pos = {x, y};
        if (rev.validateAt(pos)) {
            rev.setStoneAt(pos);
            setState((state) => { return { ...state, additionalClass: ''}});
        }
    }
    return (
        <div
            className={ `Cell ${stone} ${additionalClass}` }
            style={style}
            key={id}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            onClick={onClick}>
            <div className='stone' />
        </div>
    );
}

export default Cells;
