import { assert } from 'console';
import { deepCopy } from './ArrayUtil';

test('deepcopy', () => {
    const origin = [[1,2,3],[4,5,6],[7,8,9]];
    const result = deepCopy(origin);
    result[1][1] = 99;

    assert(origin[1][1] == result[1][1]);
});
