import { TextToReplace } from "@core/models/TextToReplace";
import { TemplateEngineRepository } from "../repositories/TemplateEngineRepository";
import { Dictionary } from "@core/models/Dictionary";

export class TemplateEngineService implements TemplateEngineRepository {

    public replaceVariable(textToReplace: TextToReplace, variableDictionary: Dictionary): String {

        let replacedText = "";
        let textWithVariables = textToReplace.getTextToReplace();
        const dictionaryWithVariables = variableDictionary.getDictionary();

        Object.keys(dictionaryWithVariables).forEach(key => {
            const value = dictionaryWithVariables[key]
            replacedText = textWithVariables.replace("${" + key + "}", value)
            textWithVariables = replacedText;
            // textToReplace.getTextToReplace() = replacedText;
        });

        return replacedText;


        // const dictionaryIsEmpty = Object.keys(dictionary).length === 0;

        // if (dictionaryIsEmpty) {
        //     return text;
        // }

        // let replacedText = "";
        // const wrongKeys = []

        // Object.keys(dictionary).forEach(key => {

        //     const value = dictionary[key]

        //     if (this.isSerializable(value)) {
        //         replacedText = text.replace("${" + key + "}", value)
        //         text = replacedText;
        //     } else {
        //         wrongKeys.push(value)
        //     }

        // });

        // return replacedText;
    }


    // public isSerializable = (value: any) => {

    //     try {
    //         JSON.stringify(value);
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }

    // }


}
