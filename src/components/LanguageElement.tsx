import type {language} from "../../types/language.ts";


export default function LanguageElement(language: language) {
    return (
        <div
            style={{
                backgroundColor: language.backgroundColor,
                color: language.color,
            }}
            className="w-fit h-fit p-2 rounded-lg shadow-lg"
        >
            {language.name}
        </div>
    );
}