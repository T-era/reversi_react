export enum Stone {
    None = 'none', Black = 'black', White = 'white'
}

export const ALine = [0,1,2,3,4,5,6,7];

export interface Pos {
    x :number;
    y :number;
}

export function directPos(a :Pos, b :Direction) {
    return {
        x: a.x + b.dx,
        y: a.y + b.dy
    };
}

export interface Score {
    black :number,
    white :number
}

export default interface Rev {
    stones :Stone[][];
    nextPlayer :Player;
    putting :Pos|null;
    score :Score;
    hintOn :boolean;
    pBlack :Player;
    pWhite :Player;
}

export type Direction = { dx :(1|0|-1), dy :(1|0|-1) };
export const Directions :Direction[] = [
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
];

export interface Turning {
    putting :Pos;
    turning :Pos[];
    turningTo :PlayerColor;
}


export type PlayerColor = Stone.Black|Stone.White;

export interface Player {
    color :PlayerColor;
    ai :AI|null;
    thinkOnce :boolean;
}

export interface AI {
    _title :string;
    (rev :Rev) :Promise<Pos|null>;
}