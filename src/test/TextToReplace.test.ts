import { TextToReplace } from "../core/models/TextToReplace";

/*
*   '' => Throw error
*   'Text to replace' => 'Text to replace'
*/

describe('TextToReplace Tests', () => {
    it('should throw error when text is empty', () => {
        expect(() => TextToReplace.create("")).toThrowError(new Error("Text to replace is empty"));
    });
});
