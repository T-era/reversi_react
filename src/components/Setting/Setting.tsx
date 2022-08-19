import React, {useState} from 'react';

import Rev, { Stone } from '../../rev';
import './Setting.scss';

import Starter,  { StarterValue } from './Starter';
import Initial, { InitialSelection, initial_pattern } from './Initial';
import Handicap, { HandicapSelection, handicap_pattern } from './Handicap';
import HintOn from './HintOn';

export interface SettingProps {
    rev :Rev;
    initialized :boolean;
    onClose :()=>void;
}
export interface SettingContents {
    starter :StarterValue;
    initial :InitialSelection;
    handicap :HandicapSelection;
    hintOn :boolean;
}
export default function Setting(props :SettingProps) {
    let { rev, onClose } = props;

    let [{ initialized }, setInitialized] = useState({
        initialized: props.initialized
    });
    let [state, setState] = useState({
        starter: Stone.Black,
        initial: 'standard',
        handicap: 'e0',
        hintOn: false
    } as SettingContents);
    const apply = (state :SettingContents) => {
         rev.initialize({
            starter: state.starter,
            initial: initial_pattern[state.initial],
            handicap: handicap_pattern[state.handicap]
         });
         setInitialized({ initialized: true });
         rev.hintOn = state.hintOn;
    }
    return (
        <div className='init'>
            <div className='init_settings'>
                <Starter value={state.starter as (Stone.Black|Stone.White)} onChange={(starter) => {
                    setState((state) => { return { ...state, starter}; });
                }}/>
                <Initial name={state.initial as ('standard'|'parallel')} onChange={(initial) => {
                    setState((state) => { return { ...state, initial}; });
                }}/>
                <Handicap name={state.handicap as 'e0'} onChange={(handicap) => {
                    setState((state) => { return { ...state, handicap}; });
                }}/>
                <HintOn hintOn={state.hintOn} onChange={(hintOn) => {
                    setState((state) => { return { ...state, hintOn }; });
                }} />
            </div>
            <div className="control">
                <div className='buttons'>
                    <button onClick={() => {
                        apply(state);
                        onClose();
                    }}>Start!</button>
                    {initialized
                        ? (
                            <>
                                <span>or</span>
                                <button onClick={onClose}>Back to Game</button>
                            </>
                        )
                        : null
                    }
                </div>
            </div>
        </div>
    );
}
