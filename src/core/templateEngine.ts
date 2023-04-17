
/*
*   Crear clase para realizar un mock del console.log implementando
*   una interfaz.
*/

export function replaceVariable(text: String, dictionary: Object): Object {
    const dictionaryIsEmpty = Object.keys(dictionary).length === 0;
    
    if (dictionaryIsEmpty) {
        return text;
    }

    let replacedText = "";
    const wrongKeys = []

    Object.keys(dictionary).forEach(key => {

        const value = dictionary[key]

        if (isSerializable(value)) {
            replacedText = text.replace("${"+key+"}", value)
            text = replacedText;
        } else {
            wrongKeys.push(value)
        }

    });

    return { textResponse: replacedText, warnings: wrongKeys }
}

const isSerializable = (value: any) => {

    try {
        JSON.stringify(value);
        return true;
    } catch (error) {
        return false;
    }

}
