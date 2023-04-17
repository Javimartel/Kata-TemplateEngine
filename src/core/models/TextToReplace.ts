export class TextToReplace {
    private textToReplace: String;

    private constructor(textToReplace: String) {
        this.textToReplace = textToReplace;
    }

    static create(textToReplace: String): TextToReplace {
        const isEmpty = textToReplace === "";
        if (isEmpty) {
            throw new Error("Text to replace is empty");
        }
        return new TextToReplace(textToReplace);
    }

    getTextToReplace(): String {
        return this.textToReplace;
    }
}
