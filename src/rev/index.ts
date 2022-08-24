import Rev from './types';
import Settings from './Settings';

export { Stone, ALine } from './types';
export type { Score, Pos, Turning, PlayerColor, AI } from './types';
export { ensureCanPut, initialize, isInputWaiting, putStoneAt, putStoneAt2, skipPlayer, findHolded } from './Rev';
export { requestThink } from './Player';
export type { Settings }
export default Rev;
