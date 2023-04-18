import { TextToReplace } from "@core/models/TextToReplace";
import { TemplateEngineRepository } from "../repositories/TemplateEngineRepository";
import { Dictionary } from "@core/models/Dictionary";

export class TemplateEngineService implements TemplateEngineRepository {

    public replaceVariable(textToReplace: TextToReplace, variableDictionary: Dictionary): String {

        let replacedText = "";
        let textWithVariables = textToReplace.getTextToReplace();
        const dictionaryWithVariables = variableDictionary.getDictionary();
        const wrongKeys: Array<{}> = [];

        Object.keys(dictionaryWithVariables).forEach(key => {
            const value = dictionaryWithVariables[key];
            const variableToSearch = "${" + key + "}";

            if (!this.isSerializable(value)) {
                wrongKeys.push({ variable: key, reason: "variable is not serializable" });
            } 
            
            else if (textWithVariables.includes(variableToSearch)) {
                replacedText = textWithVariables.replace(variableToSearch, value);
                textWithVariables = replacedText;
            } 
            
            else {
                wrongKeys.push({ variable: key, reason: "variable doesnt exist in text" });
            }
        });

        this.checkLengthFrom(wrongKeys);
        
        return replacedText;
        
    }
    
    private checkLengthFrom(wrongKeys: Array<{}>) {
        if (wrongKeys.length > 0) {
            console.warn("WARNING: " + JSON.stringify(wrongKeys).replace(/\"/gi, ''));
        }
    }

    private isSerializable = (value: any) => {
        return (
            typeof value === 'string'  || 
            typeof value === 'boolean' || 
            typeof value === 'number'
        );
    }
}
