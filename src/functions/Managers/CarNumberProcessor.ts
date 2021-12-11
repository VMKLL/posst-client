import { RegionsDictionary } from '../../dictionary/RegionsDictionary';

interface CarNumber {
    carNumber: string;
    carRegion: string;
}

export function CarNumberProcessor(processed: string): null | CarNumber {
    let result = null;
    let t = replaceCarNumberToCyrillic(processed);
    let tLength = t.length;

    do {
        let cutRegion = t.slice(-3); // cut last 3 digits
        if (/[О]/.test(cutRegion)) {
            cutRegion = cutRegion.replace(/О/g, '0');
        }
        let isRegion = isRegionInDictionary(cutRegion, RegionsDictionary);
        if (isRegion && tLength > 8) {
            const cut1 = t.slice(-9, -8);
            const cut2 = t.slice(-8, -7); // digit
            const cut3 = t.slice(-7, -6); // digit
            const cut4 = t.slice(-6, -5); // digit
            const cut5 = t.slice(-5, -3);
            if (
                (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                    /^[0О]*$/.test(cut2) &&
                    /^[0О]*$/.test(cut3) &&
                    /^[1-9]*$/.test(cut4) &&
                    /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                    /^[0О]*$/.test(cut2) &&
                    /^[1-9]*$/.test(cut3) &&
                    /^[1-9]*$/.test(cut4) &&
                    /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                    /^[0О]*$/.test(cut2) &&
                    /^[1-9]*$/.test(cut3) &&
                    /^[0О]*$/.test(cut4) &&
                    /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                    /^[1-9]*$/.test(cut2) &&
                    /^[0О]*$/.test(cut3) &&
                    /^[0О]*$/.test(cut4) &&
                    /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                    /^[1-9]*$/.test(cut2) &&
                    /^[1-9]*$/.test(cut3) &&
                    /^[0О]*$/.test(cut4) &&
                    /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                    /^[1-9]*$/.test(cut2) &&
                    /^[1-9]*$/.test(cut3) &&
                    /^[1-9]*$/.test(cut4) &&
                    /^[АВЕКМНОРСТУХ0]*$/.test(cut5))
            ) {
                t = t.slice(0, -1);
                result = {
                    carNumber:
                        cut1.replace(/0/g, 'О') +
                        cut2.replace(/О/g, '0') +
                        cut3.replace(/О/g, '0') +
                        cut4.replace(/О/g, '0') +
                        cut5.replace(/0/g, 'О'),
                    carRegion: cutRegion,
                };
            }
        } else if (!isRegion && tLength > 7) {
            cutRegion = t.slice(-2); // cut last 2 digits
            if (/[О]/.test(cutRegion)) {
                cutRegion = cutRegion.replace(/О/g, '0');
            }
            isRegion = isRegionInDictionary(cutRegion, RegionsDictionary);
            if (isRegion) {
                const cut1 = t.slice(-8, -7);
                const cut2 = t.slice(-7, -6); // digit
                const cut3 = t.slice(-6, -5); // digit
                const cut4 = t.slice(-5, -4); // digit
                const cut5 = t.slice(-4, -2);
                if (
                    (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                        /^[0О]*$/.test(cut2) &&
                        /^[0О]*$/.test(cut3) &&
                        /^[1-9]*$/.test(cut4) &&
                        /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                    (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                        /^[0О]*$/.test(cut2) &&
                        /^[1-9]*$/.test(cut3) &&
                        /^[1-9]*$/.test(cut4) &&
                        /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                    (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                        /^[0О]*$/.test(cut2) &&
                        /^[1-9]*$/.test(cut3) &&
                        /^[0О]*$/.test(cut4) &&
                        /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                    (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                        /^[1-9]*$/.test(cut2) &&
                        /^[0О]*$/.test(cut3) &&
                        /^[0О]*$/.test(cut4) &&
                        /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                    (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                        /^[1-9]*$/.test(cut2) &&
                        /^[1-9]*$/.test(cut3) &&
                        /^[0О]*$/.test(cut4) &&
                        /^[АВЕКМНОРСТУХ0]*$/.test(cut5)) ||
                    (/^[АВЕКМНОРСТУХ0]*$/.test(cut1) &&
                        /^[1-9]*$/.test(cut2) &&
                        /^[1-9]*$/.test(cut3) &&
                        /^[1-9]*$/.test(cut4) &&
                        /^[АВЕКМНОРСТУХ0]*$/.test(cut5))
                ) {
                    result = {
                        carNumber:
                            cut1.replace(/0/g, 'О') +
                            cut2.replace(/О/g, '0') +
                            cut3.replace(/О/g, '0') +
                            cut4.replace(/О/g, '0') +
                            cut5.replace(/0/g, 'О'),
                        carRegion: cutRegion,
                    };
                }
            }
        }
        t = t.slice(0, -1);
        tLength = t.length;
    } while (!result && tLength > 7);
    return result;
}
function replaceCarNumberToCyrillic(string: string) {
    return string
        .replace(/A/g, 'А')
        .replace(/B/g, 'В')
        .replace(/E/g, 'Е')
        .replace(/K/g, 'К')
        .replace(/M/g, 'М')
        .replace(/H/g, 'Н')
        .replace(/O/g, 'О')
        .replace(/P/g, 'Р')
        .replace(/C/g, 'С')
        .replace(/T/g, 'Т')
        .replace(/Y/g, 'У')
        .replace(/X/g, 'Х');
}
function isRegionInDictionary(num: string, regions: typeof RegionsDictionary) {
    const keys = Object.keys(regions);
    let searchedKey: string;

    keys.forEach((key) => {
        if (key.split(',').includes(num)) {
            searchedKey = key;
        }
    });
    if (searchedKey) {
        return true;
    }
    return false;
}
