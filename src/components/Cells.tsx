import React from 'react';

import Rev, { ALine, Turning } from '../rev';
import './Cells.scss'
import Cell from './Cell';

interface CellsProps {
    rev :Rev;
    turning :Turning|null;
    onChanged: (rev :Rev, turning :Turning|null)=>void;
}
function Cells(props :CellsProps) {
    let { rev, turning, onChanged } = props;

    return (
        <div className='field'>
            { ALine.map((y) =>
                <CellLine key={y} y={y} rev={rev} turning={turning} onChanged={onChanged} />
            )}
        </div>
    );
}

interface CellLineProps {
    rev :Rev;
    turning: Turning|null;
    y :number;
    onChanged :(rev :Rev, turning :Turning|null)=>void;
}
function CellLine(props :CellLineProps) {
    let {rev, turning, y, onChanged} = props;
    return (
        <div className="CellLine">
            { ALine.map((x) => 
                <Cell key={x} x={x} y={y} rev={rev} turning={turning} onChanged={onChanged} />
            )}
        </div>
    );
}

export default Cells;
