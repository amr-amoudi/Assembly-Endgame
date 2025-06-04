import { languages } from "./data.ts";
import LanguageElement from "./components/LanguageElement.tsx";
import { useState } from "react";
import Header from "./components/Header.tsx";
import type {Letter} from "../types/letter.ts";
import LetterPlaceHolder from "./components/letterPlaceHolder.tsx";

function retrunLetters(word: string): Letter[] {
    return word.split('').map((letter) => {
        return {
            value: letter,
            isShown: false
        }
    });
}

export default function App(){
    const [word, setWord] = useState<Letter[]>(retrunLetters("hello"));


    return (
        <div className={'p-5 flex items-center justify-center flex-col'}>
            <Header />
            <div className={'flex flex-wrap justify-center w-62 gap-1 p-5 custom-font font-bold'}>
                {languages.map((language, index) => {
                    return(<LanguageElement color={language.color} name={language.name} backgroundColor={language.backgroundColor} key={index} />)
                })}
            </div>
            <div className={'flex flex-wrap justify-center w-62 gap-1 p-5'}>
                {word.map((letter) => {
                    return (
                        <LetterPlaceHolder>
                            {letter.value.toUpperCase()}
                        </LetterPlaceHolder>
                    )
                })}
            </div>
        </div>
    )
}