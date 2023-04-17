import { replaceVariable } from "../core/templateEngine";

describe('TemplateEngine Test', () => {
    it('should return the same string if dictionary is empty', () => {
        const text = 'example';
        const dictionary = {};

        const response = replaceVariable(text, dictionary);

        expect(response).toBe(text);
    });

    it('should return the text with one replaced variable', () => {
        const text = "Hola ${name}";
        const dictionary = { name: "Javi" };
        const expectedText = "Hola Javi";

        const response = replaceVariable(text, dictionary);

        expect(response).toBe(expectedText);
    });

    it('should return the text with multiple replaced variable', () => {

        const text = "This is a text with a ${variable} to be replaced. \n" +
            "And this is another text with ${other_variable} to be replaced. \n" +
            "And this is another text with ${another_variable} to be replaced.";

        const expectedText= "This is a text with a value to be replaced. \n" +
            "And this is another text with other-value to be replaced. \n" +
            "And this is another text with another-value to be replaced.";

        const dictionary = { 
            variable: "value", 
            other_variable: "other-value", 
            another_variable: "another-value" 
        }

        const response = replaceVariable(text, dictionary)

        expect(response).toBe(expectedText);
    });

    it('should return the text with multiple replaced variables and one unused', () => {
        const text = "Hola ${name} ${surname}";
        const dictionary = { name: "Javi", weather: "Sunny", surname: "Martel"  };
        const expectedText = "Hola Javi Martel";

        const response = replaceVariable(text, dictionary);

        expect(response).toBe(expectedText);
    });

    // it('should return the text ignoring null and empty variables', () => {
    //     const text = "Hola ${name} ${surname} esta realizando ${test}";
    //     const dictionary = { name: "Javi", age: null, test: '', surname: "Martel"  };
    //     const expectedText = "Hola Javi Martel";

    //     const response = replaceVariable(text, dictionary);

    //     expect(response).toBe(expectedText);
    // });
});
