export interface TemplateEngineRepository {
    replaceVariable(text: String, dictionary: Object): String
}
