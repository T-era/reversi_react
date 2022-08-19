import React, { useState } from 'react';

import Rev, { Stone, Pos } from '../rev';


interface CellProps {
    rev :Rev;
    x :number;
    y :number;
    selected :Pos|null
    cellesChanged :(pos :Pos|null)=>void;
    playMoved :()=>void;
}
function cssClass(canPut :boolean, selectedHere :boolean, stone :Stone, nextPlayer :Stone, hintOn :boolean) :String {
    let elem :string[] = [];
    if (stone !== null) elem.push(stone);
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
    let {rev, x, y, selected, cellesChanged, playMoved} = props;
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
                // } else {
                //     // 選択状態をキャンセル
                //     setState({
                //         stone,
                //         additionalClass: '',
                //         selected: false
                //     });
                }
            }
        }
    }
    return (
        <div
            className={`Cell ${cssClass(canPut, selectedHere, stone, rev.nextPlayer, rev.hintOn)}`}
            style={style}
            onClick={onClick}>
            <div className='stone' />
        </div>
    );
}

export default Cell;
