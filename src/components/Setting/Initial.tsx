import React, {useState} from 'react';

import { Stone } from '../../rev';
//import './InitModal.scss';
import image_standard from './img/initial_standard.svg';
import image_parallel from './img/initial_parallel.svg';

export const initial_pattern = {
    standard: [{
        for: Stone.Black,
        stones: [
            { x: 3, y: 3 },
            { x: 4, y: 4 },
        ],
    }, {
        for: Stone.White,
        stones: [
            { x: 3, y: 4 },
            { x: 4, y: 3 },
        ]
    }],
    parallel: [{
        for: Stone.Black,
        stones: [
            { x: 3, y: 3 },
            { x: 3, y: 4 },
        ],
    }, {
        for: Stone.White,
        stones: [
            { x: 4, y: 4 },
            { x: 4, y: 3 },
        ]
    }],
};
export type InitialSelection = 'standard'|'parallel';
export interface Props {
    name :InitialSelection;
    onChange :(name :InitialSelection) => void;
}
function imageSrcFromName(name :InitialSelection) {
    switch(name) {
        case 'standard': return image_standard;
        case 'parallel': return image_parallel;
    }
}
export default function Initial(props :Props) {
    const imageSrc = imageSrcFromName(props.name);
    let [state, setState] = useState({
        initial: props.name,
    });

    return (
        <>
            <dl>
                <dt><label>初期配置</label></dt>
                <dd>
                    <select
                        value={state.initial}
                        onChange={(e) => {
                            const value = e.target.value as InitialSelection;
                            setState({
                                initial: value
                            });
                            props.onChange(value);
                        }}>
                        <option value='standard'>標準</option>
                        <option value='parallel'>並行</option>
                    </select>
                </dd>
            </dl>
            <img src={imageSrc} className='image' alt='ToBe...'/>
        </>
    );
}
