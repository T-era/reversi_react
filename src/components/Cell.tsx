import React from 'react';

import Rev, { Stone, Turning, ensureCanPut, putStoneAt } from '../rev';
import { findHolded } from '../rev/Rev';


interface CellProps {
    rev :Rev;
    turning :Turning|null;

    x :number;
    y :number;
    onChanged :(rev :Rev, turning :Turning|null)=>void;
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
    let {rev, turning, x, y, onChanged} = props;
    let isTurning = turning !== null && turning.turning.some((p) => p.x == x && p.y == y);
    let stone = rev.stones[y][x];
    let canPut = ensureCanPut(rev.stones, {x, y}, rev.nextPlayer.color);

    const selectedHere = (turning !== null
            && turning.putting.x === x
            && turning.putting.y === y);

    const style = {
        left: x * 60, top: y * 60
    };
    const onClick = () => {
        if (rev.nextPlayer.ai === null) {
            if (stone === Stone.None) {
                if (selectedHere) {
                    const pos = {x, y};
                    let revNext = putStoneAt(rev, pos);
                    onChanged(revNext, null);
                } else {
                    const pos = {x, y};
                    if (ensureCanPut(rev.stones, pos, rev.nextPlayer.color)) {
                        const nextTurning = findHolded(rev.stones, pos, rev.nextPlayer.color);
                        onChanged(rev, nextTurning);
                    }
                }
            }
        }
    }
    return (
        <div
            className='Cell'
            style={style}
            onClick={onClick}>
            <div className={stoneCssClass(canPut, selectedHere, stone, rev.nextPlayer!.color, rev.hintOn, isTurning)}/>
        </div>
    );
}

export default Cell;
