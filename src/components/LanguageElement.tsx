import type {language} from "../../types/language.ts";

interface LanguageElementInterface {
    language: language;
    isDead : boolean
}


export default function LanguageElement({ language, isDead }: LanguageElementInterface) {

    return (
        <div
            style={{
                backgroundColor: language.backgroundColor,
                color: language.color,
            }}
            className={`w-fit h-fit p-2 rounded-lg shadow-lg relative ${
                isDead ? `opacity-70 before:content-['💀'] before:absolute 
                          before:top-1/2 before:left-1/2 before:-translate-x-1/2 
                          before:-translate-y-1/2 select-none` 
                    : ''
            }`}
        >
            {language.name}
        </div>
    );
}