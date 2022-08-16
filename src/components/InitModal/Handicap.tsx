import React, {useState} from 'react';

import { Stone, Pos } from '../../rev';
import './InitModal.scss';
import imageW1 from './img/handicap_w1.svg';
import imageW2 from './img/handicap_w2.svg';
import imageW4 from './img/handicap_w4.svg';
import imageB1 from './img/handicap_b1.svg';
import imageB2 from './img/handicap_b2.svg';
import imageB4 from './img/handicap_b4.svg';
import imageE0 from './img/handicap_e0.svg';

export const handicap_pattern = {
    e0: { for: Stone.Black, stones: [] as Pos[] },
    b1: { for: Stone.Black, stones: [{ x: 0, y: 0 }] },
    b2: { for: Stone.Black, stones: [{ x: 0, y: 0 }, { x: 7, y: 7 }] },
    b4: { for: Stone.Black, stones: [{ x: 0, y: 0 }, { x: 7, y: 7 }, { x: 0, y: 7 }, { x: 7, y: 0 }] },
    w1: { for: Stone.White, stones: [{ x: 0, y: 0 }] },
    w2: { for: Stone.White, stones: [{ x: 0, y: 0 }, { x: 7, y: 7 }] },
    w4: { for: Stone.White, stones: [{ x: 0, y: 0 }, { x: 7, y: 7 }, { x: 0, y: 7 }, { x: 7, y: 0 }] },
}
export type HandicapSelection = 'e0'|'b1'|'b2'|'b4'|'w1'|'w2'|'w4';
export interface Props {
    name :HandicapSelection;
    onChange :(name :HandicapSelection) => void;
}

function imageSrcFromName(name :HandicapSelection) {
    switch(name) {
        case 'b1': return imageB1;
        case 'b2': return imageB2;
        case 'b4': return imageB4;
        case 'w1': return imageW1;
        case 'w2': return imageW2;
        case 'w4': return imageW4;
        case 'e0': return imageE0;
    }
}
export default function Handicap(props :Props) {
    let [state, setState] = useState({
        handicap: props.name,
    });
    const imageSrc = imageSrcFromName(props.name);

    return (
        <>
            <dl>
                <dt><label>ハンディキャップ</label></dt>
                <dd>
                    <select
                        value={state.handicap}
                        onChange={(e) => {
                            const value = e.target.value as HandicapSelection;
                            setState({
                                handicap: value
                            });
                            props.onChange(value);
                        }}>
                        <option value='w4'>白+4</option>
                        <option value='w2'>白+2</option>
                        <option value='w1'>白+1</option>
                        <option value='e0'>なし</option>
                        <option value='b1'>黒+1</option>
                        <option value='b2'>黒+2</option>
                        <option value='b4'>黒+4</option>
                    </select>
                </dd>
            </dl>
            <img src={imageSrc} className='image'/>
        </>
    );
}
