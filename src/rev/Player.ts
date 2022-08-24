import Rev, { PlayerColor, Player, AI } from './types';

import { putStoneAt, skipPlayer } from './Rev';

export function initializePlayer(color :PlayerColor, ai :AI|null) :Player {
    return {
        color,
        ai,
        thinkOnce: false,
    };
}

export function requestThink(rev :Rev, then :(r :Rev)=>void) {
    let player = rev.nextPlayer;
    if (player.ai === null
        || player.thinkOnce) return;
    _think(player.ai, rev).then((nextRev) => {
        then(nextRev);
    });
}

async function _think(ai :AI, rev :Rev) :Promise<Rev> {
    const pos = await ai(rev);

    if (pos !== null) {
        return putStoneAt(rev, pos);
    } else {
        return skipPlayer(rev);
    }
}

export function resetPlayer(p :Player) :Player {
    return {
        ...p,
        thinkOnce: false
    };
}
