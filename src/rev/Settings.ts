import { Pos, Stone } from './types';
import { PlayMembers } from '../algorithm';

type Starter = (Stone.Black | Stone.White);
type Initial = { for: Stone, stone :Pos }[];
interface Handicap {
    for :Stone;
    stones :Pos[];
}
export default interface Settings {
    starter :Starter;
    initial :Initial;
    handicap :Handicap;
    playMembers :PlayMembers;
    hintOn :boolean;
}

