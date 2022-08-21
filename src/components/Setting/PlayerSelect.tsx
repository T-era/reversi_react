import React, {useState} from 'react';

import { AI, y5y, generateAi } from '../../algorithm';

export const playerCandidate :{ [name: string]: AI|null} = {
    '人': null,
};
[y5y, generateAi(2, 'rabbit'), generateAi(3, 'donkey')].forEach((ai :AI) => {
    playerCandidate[ai._title] = ai;
});

export interface Props {
    label :string;
    selectedValue :string;
    onChange :(value :string) => void;
}

export default function HintOn(props :Props) {
    let [{ selectedLabel }, setState] = useState({
        selectedLabel: '人'
    });

    return (
        <>
            <dl>
                <dt><label>{props.label}</label></dt>
                <dd>
                    <select
                        value={selectedLabel}
                        onChange={(e) => {
                            const value = e.target.value;
                            setState({
                                selectedLabel: value
                            });
                            props.onChange(value);
                        }}>
                        { Object.keys(playerCandidate).map((label) => 
                            <option key={label} value={label}>{label}</option>
                        )}
                    </select>
                </dd>
            </dl>
        </>
    );
}
