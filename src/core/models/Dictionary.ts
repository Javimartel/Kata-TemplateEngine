export class Dictionary {
    private dictionary: Object;

    private constructor(dictionary: Object) {
        this.dictionary = dictionary;
    }

    static create(dictionary: Object): Dictionary {
        throw new Error("Dictionary is empty");
    }
}
