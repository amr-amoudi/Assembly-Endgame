import { getRandomWord, getFarewellText, languages } from "./data.ts";
import LanguageElement from "./components/LanguageElement.tsx";
import { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import LetterGuessPlaceHolder from "./components/LetterGuessPlaceHolder.tsx";
import LetterButtons from "./components/LetterButtons.tsx";
import FreeWillMessage from "./components/FreeWillMessage.tsx";
import type { GameState, wordData } from "../types/types.ts";


export default function App() {
  const [word, setWord] = useState<wordData>(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<Map<string, string>>(new Map());
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const { isLost, isWon, wrongGuesses } = currentGameState()
  // display free will only when the player won or when the last guess was wrong
  // looking back at the code i have no idea how it works when the player loses
  const displayFreeWillMessage: boolean = isWon || !word.map.has(mapValuesToArray(guessedLetters)[guessedLetters.size - 1]);

  // global keydown listener so you can use the Keyboard 
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const letter = e.key.toLowerCase();
      if (letter.match(/^[a-z]$/) && !guessedLetters.has(letter) && !(isLost || isWon)) {
        handleAddLetterToGuessedLetters(letter);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guessedLetters]);


  function handleAddLetterToGuessedLetters(letter: string) {
    setGuessedLetters(prevMap => {
      return new Map(prevMap.set(letter, letter));
    });
  }

  function currentGameState(): GameState {
    let wrongGuesses: number = 0
    let isWon: boolean = false
    let isLost: boolean = false
    // loop through the 'guessedLetters' values
    // to get the amount of wrongGuesses
    for (const letter of guessedLetters.values()) {
      // if the current letter is not in 'word' 
      if (!word.map.has(letter)) {
        wrongGuesses++
      }
    }

    // (guessedLetters.size - wrongGuesses) is the amount of right guesses
    if (word.map.size === (guessedLetters.size - wrongGuesses)) {
      isWon = true
    }

    // if wrong guess is more than 7 the player loses
    if (wrongGuesses > 7) {
      isLost = true
    }

    return { isWon, isLost, wrongGuesses }
  }

  function playAgain() {
    setWord(getRandomWord());
    setGuessedLetters(new Map());
  }

  // this will get the {_ : values} as an array
  function mapValuesToArray<K, V>(map: Map<K, V>): V[] {
    return [...map.values()]
  }

  return (
    <div className={'p-5 flex items-center justify-center flex-col'}>
      <Header />

      <FreeWillMessage
        display={(wrongGuesses > 0 && displayFreeWillMessage) || (isWon && displayFreeWillMessage)}
        isLost={isLost}
        isWon={isWon}>
        {getFarewellText(languages[wrongGuesses - 1]?.name)}
      </FreeWillMessage>

      <div className={'flex flex-wrap justify-center w-62 gap-1 p-5 custom-font font-bold'}>
        {languages.map((language, index) => {
          const isDead = wrongGuesses > index;

          return (
            <LanguageElement language={language} isDead={isDead} key={index} />
          )
        })}
      </div>
      <div className={'flex flex-wrap justify-center w-62 gap-1 p-5'}>
        {word.word.split('').map((letter: string, index: number) => {
          const isShown = guessedLetters.has(letter);

          return (
            <LetterGuessPlaceHolder isShown={isShown} isLost={isLost} key={index}>
              {letter}
            </LetterGuessPlaceHolder>
          )
        })}
      </div>
      <div className={'gap-2 flex flex-wrap justify-center w-62 p-5 max-w-[650px]'}>
        {letters.split('').map((letter) => {
          const isClicked = guessedLetters.has(letter);
          const isRight = word.map.has(letter)

          return (
            <LetterButtons
              isDisabled={isLost || isWon}
              isClicked={isClicked}
              isRight={isRight}
              key={letter}
              eventHandler={handleAddLetterToGuessedLetters}>

              {letter}

            </LetterButtons>
          )
        })}
      </div>
      {(isLost || isWon) &&
        <button className={'bg-[#11b5e5] ' +
          'custom-font px-20 py-2.5 font-bold ' +
          'border-amber-50 border-2 rounded-md'} onClick={playAgain}>New Game</button>}
    </div>
  )
}
