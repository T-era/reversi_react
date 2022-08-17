import React, {useState} from 'react';
import ReactModal from 'react-modal';

import Rev, { Stone } from '../../rev';
import './InitModal.scss';

import Starter,  { StarterValue } from './Starter';
import Initial, { InitialSelection, initial_pattern } from './Initial';
import Handicap, { HandicapSelection, handicap_pattern } from './Handicap';
import HintOn from './HintOn';

export interface InitModalProps {
    isOpen: boolean;
    rev :Rev;
    onGameInitialized: ()=>void;
}
export interface Setting {
    starter :StarterValue;
    initial :InitialSelection;
    handicap :HandicapSelection;
    hintOn :boolean;
}
export default function InitModal(props :InitModalProps) {
    let rev = props.rev;
    ReactModal.setAppElement('#root');

    let [state, setState] = useState({
        starter: Stone.Black,
        initial: 'standard',
        handicap: 'e0',
        hintOn: false
    } as Setting);
    const apply = (state :Setting) => {
         rev.initialize({
            starter: state.starter,
            initial: initial_pattern[state.initial],
            handicap: handicap_pattern[state.handicap]
         });
         rev.hintOn = state.hintOn;
    }
    return (
        <ReactModal
            isOpen={props.isOpen}
            contentLabel="Settings"
            className='init_modal'>
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
                <button onClick={() => {
                    apply(state);
                    props.onGameInitialized();
                }}>Start!</button>
            </div>
        </ReactModal>
    );
}
