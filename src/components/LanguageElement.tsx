import type {language} from "../../types/language.ts";


export default function LanguageElement(language: language){
    return (
        <div className={`bg-${language.backgroundColor}-500 text-${language.color}-500 w-fit h-fit p-5`}>
            {language.name}
        </div>
    )
}