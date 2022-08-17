import React, { useState } from 'react';

import Rev, { Pos } from '../rev';
import './Cells.scss'
import Cell from './Cell';

interface CellsProps {
    rev :Rev;
    onPlayMoved: ()=>void;
}
function Cells(props :CellsProps) {
    let [{selected}, setState] = useState({selected: null as Pos|null});
    const cellesChanged = (selected :Pos|null) => {
        setState({selected});
    };
    const playMoved = () => {
        setState({selected: null});
        props.onPlayMoved();
    }
    return (
        <>
            <CellLine y={0} rev={props.rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <CellLine y={1} rev={props.rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <CellLine y={2} rev={props.rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <CellLine y={3} rev={props.rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <CellLine y={4} rev={props.rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <CellLine y={5} rev={props.rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <CellLine y={6} rev={props.rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <CellLine y={7} rev={props.rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
        </>
    );
}

interface CellLineProps {
    rev :Rev;
    y :number;
    selected :Pos|null;
    cellesChanged :(pos :Pos|null)=>void;
    playMoved :()=>void;
}
function CellLine(props :CellLineProps) {
    let {rev, y, selected, cellesChanged, playMoved} = props;
    return (
        <div className="CellLine">
            <Cell x={0} y={y} rev={rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <Cell x={1} y={y} rev={rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <Cell x={2} y={y} rev={rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <Cell x={3} y={y} rev={rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <Cell x={4} y={y} rev={rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <Cell x={5} y={y} rev={rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <Cell x={6} y={y} rev={rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
            <Cell x={7} y={y} rev={rev} selected={selected} cellesChanged={cellesChanged} playMoved={playMoved} />
        </div>
    );
}

export default Cells;
