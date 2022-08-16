import React, {useState} from 'react';
import ReactModal from 'react-modal';

import Rev, { Stone } from '../../rev';
import './InitModal.scss';

import Starter from './Starter';
import Initial, { initial_pattern } from './Initial';
import Handicap, { handicap_pattern } from './Handicap';
import type { StarterValue } from './Starter';
import type { InitialSelection } from './Initial';
import type { HandicapSelection } from './Handicap';

export interface InitModalProps {
    isOpen: boolean;
    rev :Rev;
    initModalListener: (isOpen :boolean) => void;
}
export interface Setting {
    starter :StarterValue;
    initial :InitialSelection;
    handicap :HandicapSelection;
}
export default function InitModal(props :InitModalProps) {
    let rev = props.rev;
    ReactModal.setAppElement('#root');

    let [state, setState] = useState({
        starter: Stone.Black,
        initial: 'standard',
        handicap: 'e0'
    } as Setting);
    const apply = (state :Setting) => {
         rev.initialize({
            starter: state.starter,
            initial: initial_pattern[state.initial],
            handicap: handicap_pattern[state.handicap]
         });
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
            </div>
            <div className="control">
                <button onClick={() => {
                    props.initModalListener(false);
                    apply(state);
                }}>Start!</button>
            </div>
        </ReactModal>
    );
}
