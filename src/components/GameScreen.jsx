import React, { useState, useRef } from "react";

const GameScreen = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");

  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className="container min-w-[600px] mx-auto flex flex-col items-center justify-center min-h-screen h-auto p-10">
      <div>
        <h2 className="text-2xl">
          
          Pontuação:
          <span className="text-2xl font-bold text-green-600"> {score}</span>
        </h2>
        <h1 className="text-3xl font-black mt-4 mb-6">Adivinhe a palavra!</h1>
        <h3 className="text-2xl my-2">
          Dica sobre a palavra:{" "}
          <span className="text-orange-400 font-black text-3xl">{pickedCategory}</span>
        </h3>
        <p className="text-xl mt-">
          Você ainda tem{" "}
          <span className="text-green-600 font-extrabold">{guesses}</span>{" "}
          tentativa(s)
        </p>
      </div>

      <div className=" flex justify-center items-center m-8">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span
              className=" flex  items-center justify-center text-4xl  rounded-md   bg-[#1a1a1a] text-green-600 p-2 h-14 md:h-20 w-14 md:w-20 uppercase"
              key={i}
            >
              {letter}{" "}
            </span>
          ) : (
            <span
              className="blackSquare flex text-5xl    bg-[#1a1a1a] mx-[1px] rounded-md gap-2 text-black p-1 h-14 md:h-20  w-14 md:w-20 uppercase justify-center items-center "
              key={i}
            ></span>
          )
        )}
      </div>

      <div className="letterContainer  ">
        <p>Tente adivinhar uma letra da palavra:</p>

        <form className="flex items-center justify-center" onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            required
            className="letter flex text-5xl border-4  border-black bg-white text-black w-14 md:w-16 h-14 md:h-16 uppercase justify-center items-center  pl-1.5 md:pl-3  mx-2"
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />

          <button className="px-12 py-3 rounded-md font-bold  my-4  bg-orange-500 transition duration-500 hover:bg-green-400">
            Jogar!
          </button>
        </form>
      </div>

      <div className="wrongletters my-2">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i} className="text-3xl uppercase text-red-500 font-bold">
            {letter},{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
