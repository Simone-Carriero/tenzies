import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die/Die';

const App = () => {
  /* Functions for the dice */

  /* Pick a random number from 1 to 6 */
  const randomNumber = () => {
    return Math.ceil(Math.random() * 6);
  };

  /* Generate new dice object */
  const generateNewDie = () => ({
    value: randomNumber(),
    isHeld: false,
    id: nanoid(),
  });

  /* Create an array of 10 dice objects with a for loop */
  const allNewDice = () => {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allSelected = dice.every((die) => die.isHeld);
    const matchedValues = dice.every(
      (die, i, arr) => die.value === arr[0].value
    );

    if (allSelected && matchedValues) {
      setTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    if(!tenzies) {
      setDice((die) =>
      die.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
    } else {
      setDice(allNewDice())
      setTenzies(false)
    }
    
  };

  const holdDice = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  return (
    <main className='main'>
      {tenzies && <Confetti />}
      <h1 className='title'> Tenzies</h1>
      <p className='description'>
        {tenzies
          ? 'You Win'
          : 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}
      </p>
      <section className='grid-container'>
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </section>
      <button
        type='button'
        className='btn'
        onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
};

export default App;
