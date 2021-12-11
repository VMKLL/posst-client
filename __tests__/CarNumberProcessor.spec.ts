import { CarNumberProcessor } from '../src/functions/CarNumberProcessor';
/*
    Input in latin
    Output in cyrillic
*/
describe('Поиск автомобильных номеров в строке', () => {
    it('Тест 1 - правильный номер | регион XXX', () => {
        const r = CarNumberProcessor('K039KO163');
        expect(r).toStrictEqual({ carNumber: 'К039КО', carRegion: '163' });
    });
    it('Тест 2 - правильный номер | регион XX', () => {
        const r = CarNumberProcessor('K039KO63');
        expect(r).toStrictEqual({ carNumber: 'К039КО', carRegion: '63' });
    });
    it('Тест 3 - O в цифрах | 0 в буквах | правильный регион XXX', () => {
        const r = CarNumberProcessor('0OO100163');
        expect(r).toStrictEqual({ carNumber: 'О001ОО', carRegion: '163' });
    });
    it('Тест 4 - O в цифрах | 0 в буквах | правильный регион XX', () => {
        const r = CarNumberProcessor('0OO10063');
        expect(r).toStrictEqual({ carNumber: 'О001ОО', carRegion: '63' });
    });
    it('Тест 5 - O в регионе XXX', () => {
        const r = CarNumberProcessor('K039KO1O2');
        expect(r).toStrictEqual({ carNumber: 'К039КО', carRegion: '102' });
    });
    it('Тест 6 - O в регионе XX', () => {
        const r = CarNumberProcessor('K039KOO2');
        expect(r).toStrictEqual({ carNumber: 'К039КО', carRegion: '02' });
    });
    it('Тест 7 - длинная стройка из 15 символов | правильный регион XXX', () => {
        const r = CarNumberProcessor('DGO0OO100163GOD');
        expect(r).toStrictEqual({ carNumber: 'О001ОО', carRegion: '163' });
    });
    it('Тест 8 - длинная стройка из 14 символов | правильный регион XX', () => {
        const r = CarNumberProcessor('DGO0OO10063GOD');
        expect(r).toStrictEqual({ carNumber: 'О001ОО', carRegion: '63' });
    });
    it('Тест 9 - непарвильный номер | формат XxxxX | правильный регион XXX', () => {
        const r = CarNumberProcessor('K039K163');
        expect(r).toStrictEqual(null);
    });
    it('Тест 9.1 - непарвильный номер | формат XxxxX | правильный регион XXX', () => {
        const r = CarNumberProcessor('950HA163');
        expect(r).toStrictEqual(null);
    });
    // АВЕКМНОРСТУХ0
    it('Тест 10 - нули в цифрах | формат 00X | правильный регион XXX', () => {
        const r = CarNumberProcessor('A001BE163');
        expect(r).toStrictEqual({ carNumber: 'А001ВЕ', carRegion: '163' });
    });
    it('Тест 11 - нули в цифрах | формат 0XX | правильный регион XXX', () => {
        const r = CarNumberProcessor('K011MH163');
        expect(r).toStrictEqual({ carNumber: 'К011МН', carRegion: '163' });
    });
    it('Тест 12 - нули в цифрах | формат 0X0 | правильный регион XXX', () => {
        const r = CarNumberProcessor('O010PC163');
        expect(r).toStrictEqual({ carNumber: 'О010РС', carRegion: '163' });
    });
    it('Тест 13 - нули в цифрах | формат X00 | правильный регион XXX', () => {
        const r = CarNumberProcessor('T100YX163');
        expect(r).toStrictEqual({ carNumber: 'Т100УХ', carRegion: '163' });
    });
    it('Тест 14 - нули в цифрах | формат XX0 | правильный регион XXX', () => {
        const r = CarNumberProcessor('A110EM163');
        expect(r).toStrictEqual({ carNumber: 'А110ЕМ', carRegion: '163' });
    });
    it('Тест 15 - нулей в цифрах нет | формат XXX | правильный регион XXX', () => {
        const r = CarNumberProcessor('O111CY163');
        expect(r).toStrictEqual({ carNumber: 'О111СУ', carRegion: '163' });
    });
    // АВЕКМНОРСТУХ0
    it('Тест 16 - нули в цифрах | формат 00X | правильный регион XX', () => {
        const r = CarNumberProcessor('B001KH63');
        expect(r).toStrictEqual({ carNumber: 'В001КН', carRegion: '63' });
    });
    it('Тест 17 - нули в цифрах | формат 0XX| правильный регион XX', () => {
        const r = CarNumberProcessor('P011TX63');
        expect(r).toStrictEqual({ carNumber: 'Р011ТХ', carRegion: '63' });
    });
    it('Тест 18 - нули в цифрах | формат 0X0| правильный регион XX', () => {
        const r = CarNumberProcessor('C010YA63');
        expect(r).toStrictEqual({ carNumber: 'С010УА', carRegion: '63' });
    });
    it('Тест 19 - нули в цифрах | формат X00| правильный регион XX', () => {
        const r = CarNumberProcessor('X100YT63');
        expect(r).toStrictEqual({ carNumber: 'Х100УТ', carRegion: '63' });
    });
    it('Тест 20 - нули в цифрах | формат XX0| правильный регион XX', () => {
        const r = CarNumberProcessor('C110PO63');
        expect(r).toStrictEqual({ carNumber: 'С110РО', carRegion: '63' });
    });
    it('Тест 21 - нулей в цифрах нет | формат XXX| правильный регион XX', () => {
        const r = CarNumberProcessor('H111MK63');
        expect(r).toStrictEqual({ carNumber: 'Н111МК', carRegion: '63' });
    });
});
