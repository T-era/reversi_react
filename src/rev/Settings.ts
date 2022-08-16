import { Pos, Stone } from './types';

type Starter = (Stone.Black | Stone.White);
type Initial = { for: Stone, stones :Pos[] }[];
interface Handicap {
    for :Stone;
    stones :Pos[];
}
export default interface Settings {
    starter :Starter;
    initial :Initial;
    handicap :Handicap;
}

