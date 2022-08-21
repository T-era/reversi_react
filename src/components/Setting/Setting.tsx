import React, {useState} from 'react';

import { Stone, Settings } from '../../rev';
import './Setting.scss';

import Starter,  { StarterValue } from './Starter';
import Initial, { InitialSelection, initial_pattern } from './Initial';
import Handicap, { HandicapSelection, handicap_pattern } from './Handicap';
import HintOn from './HintOn';
import PlayerSelect, { playerCandidate } from './PlayerSelect';

import { PlayMembers } from '../../algorithm';

export interface SettingProps {
    initialized :boolean;
    onClose :(newPlayMembers :PlayMembers|null)=>void;
    onSettingsSubmitted :(settings :Settings)=>void;
}
export interface SettingContents {
    starter :StarterValue;
    initial :InitialSelection;
    handicap :HandicapSelection;
    hintOn :boolean;
    playMembers :{black:string, white:string};
}
function aiFromSetting(setting :{black:string, white:string}) :PlayMembers {
    return {
        black: playerCandidate[setting.black],
        white: playerCandidate[setting.white],
    }
}
export default function Setting(props :SettingProps) {
    let { onClose, onSettingsSubmitted } = props;

    let [{ initialized }, setInitialized] = useState({
        initialized: props.initialized
    });
    let [state, setState] = useState({
        starter: Stone.Black,
        initial: 'standard',
        handicap: 'e0',
        hintOn: false,
        playMembers: { black: '人', white: '人' },
    } as SettingContents);
    const apply = (state :SettingContents) => {
        onSettingsSubmitted({
            starter: state.starter,
            initial: initial_pattern[state.initial],
            handicap: handicap_pattern[state.handicap],
            playMembers: aiFromSetting(state.playMembers),
            hintOn: state.hintOn,
         });
         setInitialized({ initialized: true });
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
                <PlayerSelect label='黒' selectedValue={state.playMembers.black} onChange={(aiBlack)=>{
                    setState((state) => {
                        let playMembers = {
                            ...state.playMembers,
                            black: aiBlack,
                        }
                        return { ...state, playMembers };
                    });
                }}/>
                <PlayerSelect label='白' selectedValue={state.playMembers.white} onChange={(aiWhite)=>{
                    setState((state) => {
                        let playMembers = {
                            ...state.playMembers,
                            white: aiWhite,
                        }
                        return { ...state, playMembers };
                    });
                }}/>
            </div>
            <div className="control">
                <div className='buttons'>
                    <button onClick={() => {
                        apply(state);
                        let playmembersAI = {
                            black: playerCandidate[state.playMembers.black],
                            white: playerCandidate[state.playMembers.white],
                        }
                        onClose(playmembersAI);
                    }}>Start!</button>
                    {initialized
                        ? (
                            <>
                                <span>or</span>
                                <button
                                    onClick={() => onClose(null)}>Back to Game
                                </button>
                            </>
                        )
                        : null
                    }
                </div>
            </div>
        </div>
    );
}
