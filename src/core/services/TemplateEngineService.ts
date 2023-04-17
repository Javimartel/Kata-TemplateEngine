import { TextToReplace } from "@core/models/TextToReplace";
import { TemplateEngineRepository } from "../repositories/TemplateEngineRepository";
import { Dictionary } from "@core/models/Dictionary";

export class TemplateEngineService implements TemplateEngineRepository {

    public replaceVariable(textToReplace: TextToReplace, variableDictionary: Dictionary): String {

        const key = Object.keys(variableDictionary.getDictionary());
        const value = variableDictionary.getDictionary()[key[0]];

        return textToReplace.getTextToReplace().replace("${" + key + "}", value);

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
