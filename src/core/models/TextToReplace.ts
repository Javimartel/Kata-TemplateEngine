export class TextToReplace {
    private textToReplace: String;

    private constructor(textToReplace: String) {
        this.textToReplace = textToReplace;
    }

    static create(textToReplace: String): TextToReplace {
        throw new Error("Method not implemented.");
    }
}
