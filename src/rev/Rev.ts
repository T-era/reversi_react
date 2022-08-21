import { Pos, addPos, Stone, ALine, Directions, Turning } from './types';
import Settings from './Settings';
import { flatten } from '../ArrayUtil';
import { AI } from '../algorithm';

import { replaceAt } from '../ArrayUtil';

export interface Score {
    black :number,
    white :number
}

export type PlayerColor = Stone.Black|Stone.White;

export interface Player {
    color :PlayerColor;
    ai :AI|null;
    thinkOnce :boolean;
}
export function requestThink(player :Player, rev :Rev, then :(r :Rev)=>void) {
    if (player.ai === null
        || player.thinkOnce) return;
    _think(player.ai, rev).then((nextRev) => {
        then(nextRev);
    });
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

export function initialize(settings :Settings) :Rev {
    const pBlack :Player = {
        color: Stone.Black,
        ai: settings.playMembers.black,
        thinkOnce: false,
    };
    const pWhite :Player = {
        color: Stone.White,
        ai: settings.playMembers.white,
        thinkOnce: false,
    };
    const nextPlayer = settings.starter == Stone.Black
        ? pBlack
        : pWhite;

    const stones = ALine.map((y) => {
        return ALine.map((x) => {
            const init = settings.initial.find(({ stone }) => {
                return stone.x === x && stone.y === y;
            });
            if (init) {
                return init.for;
            }
            const handi = settings.handicap.stones.find((pos) => {
                return pos.x === x && pos.y === y;
            });
            if (handi) {
                return settings.handicap.for;
            }

            return Stone.None;
        });
    });

    return {
        stones,
        nextPlayer: settings.starter === Stone.Black ? pBlack : pWhite,
        putting: null,
        score: _scoreFromStones(stones),
        hintOn: settings.hintOn,
        pBlack :pBlack,
        pWhite :pWhite,
    };
}

function _scoreFromStones(stones :Stone[][]) {
    let black = 0;
    let white = 0;
    stones.forEach((line) => {
        line.forEach((stoneAt) => {
            if (stoneAt === Stone.Black) {
                black ++;
            } else if (stoneAt === Stone.White) {
                white ++;
            }
        });
    });
    return { black, white };
}

export async function _think(ai :AI, rev :Rev) :Promise<Rev> {
    const pos = await ai(rev);

    if (pos !== null) {
        return putStoneAt(rev, pos);
    } else {
        return skipPlayer(rev);
    }
}

export function putStoneAt(rev :Rev, pos :Pos) :Rev {
    if (rev.stones[pos.y][pos.x] !== Stone.None) {
        throw `error (${pos.x}, ${pos.y}) is not None,`
    }
    const colorTo = rev.nextPlayer.color;
    const nextStones = putStoneAt2(rev.stones, colorTo, pos);

    return {
        ...rev,
        stones: nextStones,
        nextPlayer: _nextNext(rev),
        score: _scoreFromStones(nextStones),
    };
}
export function putStoneAt2(stones :Stone[][], nextColor :PlayerColor, pos :Pos) :Stone[][] {
    const turning = findHolded(stones, pos, nextColor);
    const addedStones = replaceAt(stones, pos.x, pos.y, nextColor)
    const nextStones = turning.turning.reduce((sts, p) => {
        return replaceAt(sts, p.x, p.y, nextColor)
    }, addedStones);

    return nextStones;
}

export function skipPlayer(rev :Rev) :Rev {
    return {
        ...rev,
        nextPlayer: _nextNext(rev),
    };
}
function _nextNext(rev :Rev) :Player {
    if (rev.nextPlayer!.color === Stone.Black) {
        return resetPlayerForNext(rev.pWhite);
    } else {
        return resetPlayerForNext(rev.pBlack);
    }
}

export function ensureCanPut(stones :Stone[][], pos :Pos, nextPlayerColor :PlayerColor) :boolean {
    if (stones[pos.y][pos.x] !== Stone.None) {
        return false;
    }
    let holded = findHolded(stones, pos, nextPlayerColor).turning;
    // 挟んでいるかどうか？
    return holded.length > 0;
}

export function findHolded(stones :Stone[][], pos :Pos, next :PlayerColor) :Turning {
    const holdedByD = (direction :Pos) => {
        let res :Pos[] = [];
        let p = pos;
        while (true) {
            p = addPos(p, direction);
            if (isOutOfRange(p)) {
                return [];
            }
            let stoneAt = stones[p.y][p.x];
            if (stoneAt === Stone.None) {
                return [];
            } else if (stoneAt === next) {
                return res;
            } else {
                res.push(p);
            }
        }
    }
    let resultByDirection = Directions.map(holdedByD);
    return {
        putting: pos,
        turning: flatten(resultByDirection),
        turningTo: next,
    };
}
function resetPlayerForNext(p :Player) :Player {
    return {
        ...p,
        thinkOnce: false
    };
}
function isOutOfRange(pos :Pos) {
    return 0 > pos.x || pos.x >= 8
        || 0 > pos.y || pos.y >= 8;
}

export async function playAsAI(rev :Rev, ai :AI) :Promise<Rev> {
    let pos = await ai(rev);
    if (pos === null) {
        return skipPlayer(rev);
    } else {
        return putStoneAt(rev, pos);
    }
}
export function isInputWaiting(rev :Rev) :boolean {
    return rev.nextPlayer.ai === null;
}
   

/*
export default class Rev2 {
    stones :Stone[][];
    nextPlayer :Player|null = null;
    putting :Pos|null = null;
    score :Score = { black: 0, white: 0 };
    hintOn :boolean = true;
    pBlack :Player = {
        color: Stone.Black,
        ai: null,
        thinkOnce: false,
    };
    pWhite :Player = {
        color: Stone.White,
        ai: null,
        thinkOnce: false,
    };

    constructor() {
        this.stones = ALine.map(
            () => ALine.map(
                () => Stone.None));
    }
    initialize(settings: Settings) {
        if (settings.starter == Stone.Black) {
            this.nextPlayer = this.pBlack;
        } else {
            this.nextPlayer = this.pWhite;
        }
        ALine.forEach((y) => {
            ALine.forEach((x) => {
                this._setStoneAt({x, y}, Stone.None);
            });
        });
        settings.initial.forEach((init) => {
            let stone = init.for;
            init.stones.forEach((pos) => {
                this._setStoneAt(pos, stone)
            })
        });
        settings.handicap.stones.forEach((pos) => {
            this._setStoneAt(pos, settings.handicap.for);
        });
//        this.playMembers = settings.playMembers;
        this.pBlack.ai = settings.playMembers.black;
        this.pWhite.ai = settings.playMembers.white;
        this.pBlack.thinkOnce = false;
        this.pWhite.thinkOnce = false;

        this._readScore();
    }
    setStoneAt(pos :Pos) {
        let color = this.nextPlayer!.color;
        this._setStoneAt(pos, color);
        let holded = this._findHolded(pos, color);
        for (let hp of holded) {
            this._setStoneAt(hp, color);
        }
        this._readScore();
        this._changePlayer();
    }
    private _readScore() {
        let black = 0;
        let white = 0;
        ALine.forEach((y) => {
            ALine.forEach((x) => {
                let stoneAt = this.stones[y][x];
                if (stoneAt === Stone.Black) {
                    black ++;
                } else if (stoneAt === Stone.White) {
                    white ++;
                }
            });
        });
        this.score = { black, white };
    };
    private _setStoneAt(pos :Pos, stone :Stone) {
        this.stones[pos.y][pos.x] = stone;
    }
    validateAt(pos :Pos) :boolean {
        if (this.stones[pos.y][pos.x] !== Stone.None) {
            return false;
        }
        let holded = this._findHolded(pos, this.nextPlayer!.color);
        // 挟んでいるかどうか？
        return holded.length > 0;
    }
    getHoldingTo(pos :Pos) :Pos[] {
        if (this.stones[pos.y][pos.x] !== Stone.None) {
            return [];
        }
        let holded = this._findHolded(pos, this.nextPlayer!.color);
        // 挟んでいる石のリスト？
        return holded;
    }
    // 指定した位置に置いたときに、反転する石をリストで返す
    private _findHolded(pos :Pos, stone:Stone) :Pos[] {
        const holdedByD = (direction :Pos) => {
            let res :Pos[] = [];
            let p = pos;
            while (true) {
                p = addPos(p, direction);
                if (this.isOutOfRange(p)) {
                    return [];
                }
                let stoneAt = this.stones[p.y][p.x];
                if (stoneAt === Stone.None) {
                    return [];
                } else if (stoneAt === stone) {
                    return res;
                } else {
                    res.push(p);
                }
            }
        }
        let resultByDirection = Directions.map(holdedByD);
        return flatten(resultByDirection);
    }
    isOutOfRange(pos :Pos) :boolean {
        return pos.x < 0
            || pos.y < 0
            || pos.x >= 8
            || pos.y >= 8;
    }
    skipPlayer() {
        this._changePlayer();
    }
    private _changePlayer() {
        switch (this.nextPlayer!.color) {
            case Stone.White:
                this.nextPlayer = this.pBlack;
                this.nextPlayer.thinkOnce = false;
                return;
            case Stone.Black:
                this.nextPlayer = this.pWhite;
                this.nextPlayer.thinkOnce = false;
                return;
        }
    }
    getNextPlayerAI() :AI|null {
        if (this.nextPlayer!.color === Stone.Black) {
            return this.pBlack.ai;
        } else {
            return this.pWhite.ai;
        }
    }
    async playAsAI(ai :AI) {
 //       if (! this.nextPlayer!.thinkOnce) {
 //           this.nextPlayer!.thinkOnce = true;
            let pos = await ai(this);
            if (pos == null) {
                this.skipPlayer();
            } else {
                this.setStoneAt(pos);
            }
 //       }
    }
    isInputWaiting() :boolean {
        return this.getNextPlayerAI() === null;
    }
}

*/