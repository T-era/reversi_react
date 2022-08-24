import { AI } from '../rev';

import { thinkNext as y5y } from "./y5y";
import { generateAi } from './y5y';
import { generateAi as generateSbpAi } from './ScoreByPos/ai_n';

// 後悔する関数は (rev:Rev) => Pos|null の形式を取ります。
// 盤面を受け取って、次の一手を返します。パスする場合はnullを返します。
export { y5y, generateAi, generateSbpAi };

export type PlayMembers = { black :AI|null, white :AI|null };