import { Dictionary } from '../core/models/Dictionary';

/*
*   {} => Throw error
*   { key: 'value' } => { key: 'value' }
*/

describe('Dictionary Tests', () => {
    it('should throw error when dictionary is empty', () => {
        expect(() => Dictionary.create({})).toThrowError(new Error("Dictionary is empty"));
    });

    it('should return dictionary when dictionary is not empty', () => {
        const dictionary = Dictionary.create({ key: 'value' });
        expect(dictionary).toBe(dictionary);
    });
});
