import { getRandomWord, getFarewellText, languages} from "./data.ts";
import LanguageElement from "./components/LanguageElement.tsx";
import { useState } from "react";
import Header from "./components/Header.tsx";
import LetterGuessPlaceHolder from "./components/LetterGuessPlaceHolder.tsx";
import LetterButtons from "./components/LetterButtons.tsx";
import FreeWillMessage from "./components/FreeWillMessage.tsx";

export default function App(){
    const [word, setWord] = useState<string[]>(getRandomWord().split(''));
    const [guessedLetters, setGuessedLetters] = useState<string>('');
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const wrongGuesses: number = guessedLetters.split('').filter((letter) => (!word.includes(letter))).length
    const isWon:boolean = word.every((letter) => guessedLetters.includes(letter));
    const isLost:boolean = wrongGuesses > 7 ;

    function handleLetterButtonClick(letter: string) {
        setGuessedLetters(prev => {
            return prev + letter;
        });
    }

    function playAgain() {
        setWord(getRandomWord().split(''));
        setGuessedLetters('');
    }

    return (
        <div className={'p-5 flex items-center justify-center flex-col'}>

            <Header />

            <FreeWillMessage display={wrongGuesses > 0} isLost={isLost} isWon={isWon}>
                {getFarewellText(languages[wrongGuesses - 1]?.name)}
            </FreeWillMessage>

            <div className={'flex flex-wrap justify-center w-62 gap-1 p-5 custom-font font-bold'}>
                {languages.map((language, index) => {
                    const isDead = wrongGuesses > index;

                    return(
                        <LanguageElement language={language} isDead={isDead} key={index} />
                    )
                })}
            </div>
            <div className={'flex flex-wrap justify-center w-62 gap-1 p-5'}>
                {word.map((letter, index) => {
                    const isShown = guessedLetters.includes(letter);

                    return (
                        <LetterGuessPlaceHolder isLost={isLost} isShown={isShown} key={index}>
                            {letter}
                        </LetterGuessPlaceHolder>
                    )
                })}
            </div>
            <div className={'gap-2 flex flex-wrap justify-center w-62 p-5'}>
                {letters.split('').map((letter) => {
                    const isClicked = guessedLetters.includes(letter);
                    const isRight = word.includes(letter);

                    return (
                        <LetterButtons isDisabled={isWon || isLost} isClicked={isClicked} isRight={isRight} key={letter} eventHandler={handleLetterButtonClick}>
                            {letter}
                        </LetterButtons>
                    )
                })}
            </div>
            {(isLost || isWon) &&
                <button className={'bg-[#11b5e5] ' +
                'custom-font px-20 py-2.5 font-bold ' +
                'border-amber-50 border-2 rounded-md'} onClick={playAgain}>New Again</button>}
        </div>
    )
}
