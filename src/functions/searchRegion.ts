import { RegionsDictionary } from '../dictionary/RegionsDictionary';

export function searchRegion(state: string) {
    try {
        if (state) {
            const code = searchStateInDictionary(state, RegionsDictionary);
            return code;
        } else {
            return null;
        }
    } catch (err) {
        console.log('Search region:\n', err.message);
        return null;
    }
}

function searchStateInDictionary(
    state: string,
    regionsDictionary: typeof RegionsDictionary,
) {
    let result = null;
    Object.entries(regionsDictionary).forEach(([key, value]) => {
        if (value.includes(state)) {
            const code = key.split(',');
            result = code[0];
        }
    });
    return result;
}
