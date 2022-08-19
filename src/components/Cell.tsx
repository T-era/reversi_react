import React, { useState } from 'react';

import Rev, { Stone, Pos } from '../rev';


interface CellProps {
    rev :Rev;
    x :number;
    y :number;
    selected :Pos|null;
    turning :Pos[];
    cellesChanged :(pos :Pos|null)=>void;
    playMoved :()=>void;
}
function stoneCssClass(canPut :boolean, selectedHere :boolean, stone :Stone, nextPlayer :Stone, hintOn :boolean, isTurning :boolean) :string {
    if (stone !== null && stone !== Stone.None) {
        let ret = ['stone', `${stone}`];
        if (isTurning) ret.push('truning');
        return ret.join(' ');
    }

    let elem :string[] = ['stonable'];
    if (selectedHere) elem.push('reserved');
    if (canPut || selectedHere) {
        if (nextPlayer !== Stone.None) elem.push(`can_${nextPlayer}`);
    }
    if (hintOn && canPut && ! selectedHere) {
        elem.push('suggestion');
    }
    return elem.join(' ');
}
function Cell(props :CellProps) {
    let {rev, x, y, selected, turning, cellesChanged, playMoved} = props;
    let isTurning = turning.some((p) => p.x == x && p.y == y);
    let stone = rev.stones[y][x];
    let canPut = rev.validateAt({x, y});
    const [{selectedHere}, setState] = useState({
        selectedHere: false,
    });
    if (selectedHere
        && (selected === null
            || (selected.x !== x || selected.y !== y))) {
        setState({
            selectedHere: false,
        });
    }
    const style = {
        left: x * 60, top: y * 60
    };
    const onClick = () => {
        if (stone === Stone.None) {
            if (selectedHere) {
                const pos = {x, y};
                rev.setStoneAt(pos);
                setState({ selectedHere: false });
                playMoved();
            } else {
                const pos = {x, y};
                if (rev.validateAt(pos)) {
                    setState({
                        selectedHere: true
                    });
                    cellesChanged(pos);
                }
            }
        }
    }
    return (
        <div
            className='Cell'
            style={style}
            onClick={onClick}>
            <div className={stoneCssClass(canPut, selectedHere, stone, rev.nextPlayer, rev.hintOn, isTurning)}/>
        </div>
    );
}

export default Cell;
