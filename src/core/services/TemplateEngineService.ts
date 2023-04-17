import { TemplateEngineRepository } from "../repositories/TemplateEngineRepository";

export class TemplateEngineService {

    private templateEngineRepository: TemplateEngineRepository;

    constructor(templateEngineRepository: TemplateEngineRepository) {
        this.templateEngineRepository = templateEngineRepository;
    }

    public replaceVariable(text: String, dictionary: Object): String {
        throw new Error("Method not implemented.");
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
