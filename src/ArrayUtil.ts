export function flatten<T>(dArray :T[][]) :T[] {
    let res :T[] = [];
    for (let aArray of dArray) {
        res = res.concat(aArray);
    }
    return res;
}