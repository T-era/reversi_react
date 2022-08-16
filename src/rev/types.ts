export enum Stone {
    None = 'none', Black = 'black', White = 'white'
}

export const ALine = [0,1,2,3,4,5,6,7];

export type Listener = (stone :Stone) => void;

export interface Pos {
    x :number;
    y :number;
}
export function addPos(a :Pos, b :Pos) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
}

export const Directions :Pos[] = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
];