import { useCallback, useEffect, useState } from "react";
import { Start } from "./screens/Start";
import { wordsList } from "./data";
import { Game } from "./screens/Game";
import { End } from "./screens/End";
import { WordListPorps } from "./@types/WordListProps";
import { Stage } from "./@types/StagesType";

const stages: Stage[] = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState<WordListPorps>(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setpPickedCategory] = useState("");
  const [letters, setLetters] = useState< string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word: string =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category }: { word: string; category: string } =
      pickWordAndCategory();

    let wordLetterArray: string[] = word.split("");
    wordLetterArray =
      wordLetterArray && wordLetterArray.map((letter) => letter.toLowerCase());

    setPickedWord(word);
    setpPickedCategory(category);
    setLetters(wordLetterArray);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //process the letter input
  const verifyLetter: (letter: string) => void = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name);
      clearLetterStates();
    }
  }, [guesses]);

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //win condition
    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === stages[1].name
    ) {
      setScore((actualScore) => (actualScore += 100));

      //restart game whith new word
      startGame();
    }
  }, [ guessedLetters, letters, startGame, gameStage ]);

  //restart the game
  const retry = () => {
    setScore(0);
    setGuesses(5);
    setGameStage(stages[0].name);
  };
  return (
    <div className="flex items-center  justify-center min-h-screen h-auto w-full mx-auto text-center  px-10 md:w-screen  md:h-screen bg-[#252525] text-white 0 ">
      {gameStage === "start" && <Start startGame={startGame} />}

      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}

      {gameStage === "end" && <End retry={retry} score={score} />}
    </div>
  );
}

export default App;
