import Rev, { Pos, Stone, AI } from '../../rev';
import { flatten } from '../../ArrayUtil';
import { ensureCanPut, PlayerColor, putStoneAt2 } from '../../rev';

// 目の前のn手で、とにかく沢山の石を取りたがる
// TODO パスと選択不能の表現分け
export function generateAi(n :number, title :string) :AI {
    async function thinkNext(rev :Rev) :Promise<Pos|null> {
        return best(rev.stones, rev.nextPlayer.color, n);
    }
    
    thinkNext._title = title;
    return thinkNext;
}
function best(initStones :Stone[][], nextColor :PlayerColor, n :number) :Pos|null{
    const result = bestStones(initStones, nextColor, n, true);
    if (result === null) return null;
    else return result.pos;

    function bestStones(initStones :Stone[][], nextColor :PlayerColor, cnt :number, toMax :boolean) :{pos :Pos|null, stones: Stone[][]} {
        // 石を置ける場所一覧
        const posToPutList = flatten(initStones.map((line, y) => {
            return line.map((stone, x) => {
                return {stone, pos: { x, y }};
            })
        })).filter(({stone, pos}) => {
            return stone === Stone.None
                && ensureCanPut(initStones, pos, nextColor);
        }).map(({pos}) => pos);

        // 石を置く場所ごとに、結果配置
        const future :{pos :Pos, stones :Stone[][]}[] = posToPutList.map((posToPut) => {
            const nextStones = putStoneAt2(initStones, nextColor, posToPut);
            if (cnt == 1) {
                return {
                    pos: posToPut,
                    stones: nextStones,
                };
            } else {
                return {
                    pos: posToPut,
                    stones: bestStones(nextStones, nextNextColor(nextColor), cnt - 1, ! toMax).stones,
                };
            }
        });
        // 石を置く場所ごとに、結果配置とスコア
        const futureScores = future.map(
            item => { return { pos: item.pos, stones: item.stones, score: _scoreFromStones(item.stones)}; }
        ).sort((a :{pos :Pos, score :number}, b :{pos :Pos, score :number}) => {
            const aScore = a.score;
            const bScore = b.score;
            return toMax
                ? bScore - aScore
                : aScore - bScore;
        });
        if (futureScores.length > 0) {
            return futureScores[0];
        } else {
            // パスするしかない
            return {pos: null, stones: initStones};
        }
    }
    function _scoreFromStones(stones :Stone[][]) :number {
        if (stones.length === 0) {
            return -1;
        } else {
            return stones.reduce((ls :number, line :Stone[]) => {
                return ls + lineScore(line)
            }, 0);
        }
    }
    function lineScore(line :Stone[]) :number {
        return line.reduce((sum, stone) => sum + (stone === nextColor ? 1 : 0), 0)
    }
    function nextNextColor(nextColor :PlayerColor) :PlayerColor {
        if (nextColor === Stone.Black) return Stone.White;
        else return Stone.Black;
    }
}