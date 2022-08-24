import Rev, { Pos, directPos, Stone, ALine, Directions, Turning, Player, PlayerColor, Direction } from './types';
import Settings from './Settings';
import { initializePlayer, resetPlayer } from './Player';
import { flatten } from '../ArrayUtil';

import { replaceAt } from '../ArrayUtil';

export function initialize(settings :Settings) :Rev {
    const pBlack :Player = initializePlayer(Stone.Black, settings.playMembers.black);
    const pWhite :Player = initializePlayer(Stone.White, settings.playMembers.white);

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
        return resetPlayer(rev.pWhite);
    } else {
        return resetPlayer(rev.pBlack);
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
    const holdedByD = (direction :Direction) => {
        let res :Pos[] = [];
        let p = pos;
        while (true) {
            p = directPos(p, direction);
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

function isOutOfRange(pos :Pos) {
    return 0 > pos.x || pos.x >= 8
        || 0 > pos.y || pos.y >= 8;
}

export function isInputWaiting(rev :Rev) :boolean {
    return rev.nextPlayer.ai === null;
}
