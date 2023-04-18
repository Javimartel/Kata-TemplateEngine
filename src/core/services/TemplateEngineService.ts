import { TextToReplace } from "@core/models/TextToReplace";
import { TemplateEngineRepository } from "../repositories/TemplateEngineRepository";
import { Dictionary } from "@core/models/Dictionary";

export class TemplateEngineService implements TemplateEngineRepository {

    public replaceVariable(textToReplace: TextToReplace, variableDictionary: Dictionary): String {

        let replacedText = "";
        let textWithVariables = textToReplace.getTextToReplace();
        const dictionaryWithVariables = variableDictionary.getDictionary();
        const wrongKeys: Array<{}> = [];
        
        this.checkVariablesIn(textWithVariables, dictionaryWithVariables, wrongKeys);

        Object.keys(dictionaryWithVariables).forEach(key => {
            const value = dictionaryWithVariables[key];
            const variableToSearch = "${" + key + "}";

            const notSerializable = !this.isSerializable(value);
            const isVariableInText = textWithVariables.includes(variableToSearch);

            if (notSerializable) {
                this.addWarningTo(wrongKeys, key, 'variable is not serializable');
            } 
            
            else if (isVariableInText) {
                replacedText = textWithVariables.replace(variableToSearch, value);
                textWithVariables = replacedText;
            } 
            
            else {
                this.addWarningTo(wrongKeys, key, 'variable doesnt exist in text');
            }
        });

        this.checkLengthFrom(wrongKeys);
        
        return replacedText;
        
    }
    
    private checkLengthFrom(wrongKeys: Array<{}>) {
        const isNotEmpty = wrongKeys.length != 0;
        if (isNotEmpty) {
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

    private checkVariablesIn(textWithVariables: String, dictionaryWithVariables: Object, wrongKeys: Array<{}>) {
        const regexpToSearch = /\${\w+}/g;
        const variablesToSearch = textWithVariables.match(regexpToSearch);

        variablesToSearch.forEach(variable => {
            const replacedVariable = variable.replace(/\${|}/g, '');
            const isNotInDictionary = !(replacedVariable in dictionaryWithVariables);
            if (isNotInDictionary) {
                this.addWarningTo(wrongKeys, replacedVariable, 'variable doesnt exist in dictionary');
            }
        });
    }

    private addWarningTo(wrongKeys: Array<{}>, warnedKey: String, message: String) {
        wrongKeys.push({ variable: warnedKey, reason: message });
    }
}
