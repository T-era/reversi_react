import Rev, { Pos, findHolded, Stone } from '../../rev';
import { flatten } from '../../ArrayUtil';

// 目の前の一手で、とにかく沢山の石を取りたがる短絡思考
export async function thinkNext(rev :Rev) :Promise<Pos|null> {
    await new Promise(resolve => setTimeout(resolve, 300)) // 0.3秒待つ

    const scoreByPos :Candidate[] = flatten(rev.stones.map((line, y) => {
        return line.map((stone, x) => {
            const posToPut = {x, y};
            if (stone === Stone.None) {
                const score =  findHolded(rev.stones, posToPut, rev.nextPlayer.color).turning.length;
                return {
                    posToPut,
                    score,
                };
            } else {
                return {
                    posToPut,
                    score: 0
                }
            }
        })
    })).sort((a :Candidate, b :Candidate) => b.score - a.score);
    let best = scoreByPos[0];
    if (best.score !== 0) {
        return best.posToPut;
    } else {
        return null;
    }
}

thinkNext._title = 'rat';

export interface Candidate {
    posToPut :Pos;
    score :number;
}