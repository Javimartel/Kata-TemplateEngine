import { Dictionary } from "@core/models/Dictionary";
import { TextToReplace } from "@core/models/TextToReplace";

export interface TemplateEngineRepository {
    replaceVariable(text: TextToReplace, dictionary: Dictionary): String
}
