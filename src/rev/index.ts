import Rev from './types';
import Settings from './Settings';

export { Stone, ALine } from './types';
export type { Score, Pos, Turning, PlayerColor, AI } from './types';
export { ensureCanPut, findHolded, initialize, isInputWaiting, putStoneAt, putStoneAt2, skipPlayer } from './Rev';
export { requestThink } from './Player';
export type { Settings }
export default Rev;
