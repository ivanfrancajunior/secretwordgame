const End = ({ retry, score }: { retry: () => void; score: number }) => {
  return (
    <div>
      <h1 className="text-2xl md:text-5xl font-bold m-3">Fim de jogo!</h1>
      <h2 className="text-2xl  md:text-5xl font-bold m-3">
        Você fez{" "}
        <span className="text-green-500 font-bold text-2xl md:text-5xl">
          {score} pontos!
        </span>
      </h2>

      <button
        onClick={retry}
        className="px-12 py-3 rounded-md font-bold  my-4  bg-cyan-500 transition duration-500 hover:bg-green-400 "
      >
        Recomeçar
      </button>
    </div>
  );
};

export { End };
