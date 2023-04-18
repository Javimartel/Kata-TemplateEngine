import { TemplateEngineService } from '../core/services/TemplateEngineService';
import { TextToReplace } from "../core/models/TextToReplace";
import { Dictionary } from "../core/models/Dictionary";

/*
*   'this is a ${variable}' | {variable: 'test'} 
*   => 'this is a test'
*   'this is another ${variable} with ${another_variable} variables | {variable: 'test', another_variable: 'two'} 
*   => 'this is another test with two variables'
*   'this is another ${variable} with ${another_variable} variables | {variable: 'test', another_variable: null} 
*   => 'this is another test with ${another_variable} variables' + WARNING (null)
*   'this is another ${variable} with ${another_variable} variables | {variable: 'test', uknown_variable: 'two'} 
*   => 'this is another test with ${another_variable} variables' + WARNING (not found)
*/

describe('TemplateEngine Tests', () => {

    const templateEngineService = new TemplateEngineService();

    it('should return the text with the variable replaced if everything is correct', () => {
        const textToReplace = TextToReplace.create('this is a ${variable}');
        const variableDictionary = Dictionary.create({ variable: 'test' });
        const expectedResponse = 'this is a test';

        const replacedText = templateEngineService.replaceVariable(textToReplace, variableDictionary);

        expect(replacedText).toBe(expectedResponse);
    });

    it('should return the text with more than one variable replaced if everything is correct', () => {
        const textToReplace = TextToReplace.create('this is another ${variable} with ${another_variable} variables');
        const variableDictionary = Dictionary.create({ variable: 'test', another_variable: 'two' });
        const expectedResponse = 'this is another test with two variables';

        const replacedText = templateEngineService.replaceVariable(textToReplace, variableDictionary);

        expect(replacedText).toBe(expectedResponse);
    });

    it('should return a warning if the variable is unknown', () => {
        const textToReplace = TextToReplace.create('this is another ${variable} with ${another_variable} variables');
        const variableDictionary = Dictionary.create({ variable: 'test', another_variable: "two", unknown_variable: "test" });
        const warn = jest.spyOn(console, 'warn').mockImplementation();
        const expectedResponse = 'this is another test with two variables';
        const expectedWarning = 'WARNING: [{variable:unknown_variable,reason:variable doesnt exist}]';

        const replacedText = templateEngineService.replaceVariable(textToReplace, variableDictionary);

        expect(warn).toBeCalledWith(expectedWarning);
        warn.mockReset();
        expect(replacedText).toBe(expectedResponse);
    });
    
    it('should return a warning if the variable is not serializable', () => {
        const textToReplace = TextToReplace.create('this is another ${variable} with ${another_variable} variables');
        const variableDictionary = Dictionary.create({ variable: 'test', another_variable: null });
        const warn = jest.spyOn(console, 'warn').mockImplementation();
        const expectedResponse = 'this is another test with ${another_variable} variables';
        const expectedWarning = 'WARNING: [{variable:another_variable,reason:variable is not serializable}]';

        const replacedText = templateEngineService.replaceVariable(textToReplace, variableDictionary);

        expect(warn).toBeCalledWith(expectedWarning);
        warn.mockReset();
        expect(replacedText).toBe(expectedResponse);
    });
});
