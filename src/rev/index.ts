import Rev, { Score } from './Rev';
import Settings from './Settings';

export { Stone, ALine } from './types';
export type { Pos, Turning } from './types';
export { ensureCanPut, initialize, isInputWaiting, playAsAI, putStoneAt, requestThink, skipPlayer, findHolded } from './Rev';
export type { Score , Settings }
export default Rev;
