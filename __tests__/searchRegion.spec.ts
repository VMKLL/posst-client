import { searchRegion } from '../src/functions/searchRegion';

describe('Search region', () => {
    it('Test 1 - Адыгея', () => {
        const r = searchRegion('Адыгея');
        expect(r).toStrictEqual('01');
    });
    it('Test 2 - Алтай', () => {
        const r = searchRegion('Алтай');
        expect(r).toStrictEqual('04');
    });
    it('Test 3 - Республика Башкортостан', () => {
        const r = searchRegion('Республика Башкортостан');
        expect(r).toStrictEqual('02');
    });
    it('Test 4 - Крым', () => {
        const r = searchRegion('Крым');
        expect(r).toStrictEqual('82');
    });
    it('Test 5 - Самарская область', () => {
        const r = searchRegion('Самарская область');
        expect(r).toStrictEqual('63');
    });
});
