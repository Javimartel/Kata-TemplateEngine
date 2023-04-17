export class Dictionary {
    private dictionary: Object;

    private constructor(dictionary: Object) {
        this.dictionary = dictionary;
    }

    static create(dictionary: Object): Dictionary {
        const isEmpty = Object.keys(dictionary).length === 0;
        if (isEmpty) {
            throw new Error("Dictionary is empty");
        }
        return new Dictionary(dictionary);
    }

    getDictionary(): Object {
        return this.dictionary;
    }
}
