import { UnicodeString } from './unicode-string';

describe('concat', () => {
    test('show correct length', () => {
        const str1 = UnicodeString.from('😀🀵𝄞𝐁');
        expect(str1.length).toEqual(4);
    
        const str2 = UnicodeString.from('Hello: ');
        expect(str2.length).toEqual(7);
    });
    
    test('concat two strings', () => {
        const str1 = UnicodeString.from('😀🀵𝄞𝐁');
        const str2 = UnicodeString.from('Hello: ');
        const union = str1.concat(str2);
        expect(union.length).toEqual(11);
    });
});

describe('slice', () => {
    test('positive indexes', () => {
        const str1 = UnicodeString.from('The morning is upon us.');
        expect(str1.length).toEqual(23);

        const str2 = str1.slice(1, 8);
        expect(str2.toString()).toEqual('he morn');

        const str3 = str1.slice(4, -2);
        expect(str3.toString()).toEqual('morning is upon u');

        const str4 = str1.slice(12);
        expect(str4.toString()).toEqual('is upon us.');

        const str5 = str1.slice(30);
        expect(str5.toString()).toEqual('');
    });

    test('negative indexes', () => {
        const str = UnicodeString.from('The morning is upon us.');
        expect(str.length).toEqual(23);

        const str1 = str.slice(-3);
        expect(str1.toString()).toEqual('us.');

        const str2 = str.slice(-3, -1);
        expect(str2.toString()).toEqual('us');

        const str3 = str.slice(0, -1);
        expect(str3.toString()).toEqual('The morning is upon us');

        const str4 = str.slice(-11, 16);
        expect(str4.toString()).toEqual('is u');

        const str5 = str.slice(11, -7);
        expect(str5.toString()).toEqual(' is u');

        const str6 = str.slice(-5, -1);
        expect(str6.toString()).toEqual('n us');
    });

    test('unicode characters', () => {
        const str = UnicodeString.from('😀🀵𝄞𝐁');
        expect(str.slice(1, 3).length).toEqual(2);
    });
});

describe('reverse', () => {
    test('reverse unicode', () => {
        const str = UnicodeString.from('😀🀵𝄞𝐁');
        const result = str.reverse();

        expect(str.toString()).toEqual('😀🀵𝄞𝐁');
        expect(result.toString()).toEqual('𝐁𝄞🀵😀');
    });
});

describe('equals', () => {
    test('simple equality', () => {
        const str1 = UnicodeString.from('Hello World!');
        const str2 = UnicodeString.from('Hello World!');

        expect(str1.equals(str2)).toEqual(true);
    });

    test('simple inequality, unequal length', () => {
        const str1 = UnicodeString.from('Hello World!');
        const str2 = UnicodeString.from('Hello');

        expect(str1.equals(str2)).toEqual(false);
    });

    test('simple inequality, equal length', () => {
        const str1 = UnicodeString.from('Hello World!');
        const str2 = UnicodeString.from('Hello World1');

        expect(str1.equals(str2)).toEqual(false);
    });

    test('unicode inequality', () => {
        const str1 = UnicodeString.from('😀🀵𝄞𝐁!');
        const str2 = UnicodeString.from('A🀵𝄞𝐁!');

        expect(str1.equals(str2)).toEqual(false);
    });
});

describe('indexOf', () => {
    test('two smiles in the way', () => {
        const str1 = UnicodeString.from('Hi 😀😀😀 there 🀵𝄞𝐁');
        const str2 = UnicodeString.from('🀵𝄞');

        expect(str1.indexOf(str2)).toEqual(13);
    });

    test('no surrogate pairs in the way', () => {
        const str1 = UnicodeString.from('Hi ABC there 🀵𝄞𝐁');
        const str2 = UnicodeString.from('🀵𝄞');

        expect(str1.indexOf(str2)).toEqual(13);
    });

    test('no match', () => {
        const str1 = UnicodeString.from('Hi 😀 there 🀵𝄞𝐁');
        const str2 = UnicodeString.from('Bye');

        expect(str1.indexOf(str2)).toEqual(-1);
    });
});
