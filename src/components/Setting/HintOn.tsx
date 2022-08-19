import React, {useState} from 'react';

export interface Props {
    hintOn :boolean;
    onChange :(value :boolean) => void;
}

export default function HintOn(props :Props) {
    let [state, setState] = useState({
        hintOn: props.hintOn,
    });

    return (
        <>
            <dl>
                <dt><label>ヒント表示</label></dt>
                <dd>
                    <select
                        value={String(state.hintOn)}
                        onChange={(e) => {
                            const strValue = e.target.value;
                            const value = strValue === 'true';
                            setState({
                                hintOn: value
                            });
                            props.onChange(value);
                        }}>
                        <option value='false'>表示しない</option>
                        <option value='true'>表示する</option>
                    </select>
                </dd>
            </dl>
        </>
    );
}
