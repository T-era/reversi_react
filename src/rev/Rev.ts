import { Pos, addPos, Stone, Listener, ALine, Directions } from './types';
import Settings from './Settings';
import { flatten } from '../ArrayUtil';

interface Score {
    black :number,
    white :number
}
export default class Rev {
    stones :Stone[][];
    // GUIに状況変化を伝えるためのリスナ
    listeners :Listener[][];
    nextPlayer :Stone.Black | Stone.White = Stone.White;
    scoreListener :(s :Score) => void = () => {};

    constructor() {
        this.stones = ALine.map(
            () => ALine.map(
                () => Stone.None));
        this.listeners = ALine.map(
            () => ALine.map(
                () => function() {}));
            }
    setListenerAt(pos :Pos, listener :Listener) {
        this.listeners[pos.y][pos.x] = listener;
    }
    initialize(settings: Settings) {
        // いったん固定で白先
        this.nextPlayer = settings.starter;
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

        this.readScore();
    }
    setStoneAt(pos :Pos) {
        let stone = this.nextPlayer;
        this._setStoneAt(pos, stone);
        let holded = this.findHolded(pos, stone);
        for (let hp of holded) {
            this._setStoneAt(hp, stone);
        }
        this.readScore();
        this.skipPlayer();
    }
    private readScore() {
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
        this.scoreListener({ black, white });
    };
    private _setStoneAt(pos :Pos, stone :Stone) {
        this.stones[pos.y][pos.x] = stone;
        this.listeners[pos.y][pos.x](stone);
    }
    validateAt(pos :Pos) :boolean {
        if (this.stones[pos.y][pos.x] !== Stone.None) {
            return false;
        }
        let holded = this.findHolded(pos, this.nextPlayer);
        // 挟んでいるかどうか？
        return holded.length > 0;
    }
    // 指定した位置に置いたときに、反転する石をリストで返す
    private findHolded(pos :Pos, stone:Stone) :Pos[] {
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
        switch (this.nextPlayer) {
            case Stone.White:
                this.nextPlayer = Stone.Black;
                return;
            case Stone.Black:
                this.nextPlayer = Stone.White;
                return;
        }
    }
    setScoreListener(listener :(s :Score) => void) {
        this.scoreListener = listener;
    }
}

