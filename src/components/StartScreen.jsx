import React from 'react'

const StartScreen = ({startGame}) => {
  return (
    <div>
        <h1 className='text-5xl font-bold mt-2 md:text-5xl'>SECRET WORD <span className='text-4xl font-bold text-end italic text-pink-400  md:text-4xl'> game</span></h1>
        <p className='text-2xl text-orange-500 my-12 md:text-5xl'>Clique abaixo para começar a jogar</p>
        <button className='px-6 py-3 rounded-md font-bold  my-4  bg-cyan-500 transition duration-500 hover:bg-cyan-600' onClick={startGame}>começar o jogo</button>
    </div>
  )
}

export default StartScreen