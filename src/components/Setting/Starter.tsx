import React, {useState} from 'react';

import { Stone } from '../../rev';
//import './InitModal.scss';

export type StarterValue = (Stone.Black|Stone.White);
export interface Props {
    value :StarterValue;
    onChange :(starter :StarterValue) => void;
}
export default function Starter(props :Props) {
    let [state, setState] = useState({
        starter: props.value,
    });

    return (
            <dl>
                <dt><label>先攻</label></dt>
                <dd>
                    <select
                        value={state.starter}
                        onChange={(e) => {
                            const value = e.target.value as StarterValue;
                            setState({
                                starter: value
                            });
                            props.onChange(value);
                        }}>
                        <option value={Stone.Black}>黒</option>
                        <option value={Stone.White}>白</option>
                    </select>
                </dd>
            </dl>
    );
}
