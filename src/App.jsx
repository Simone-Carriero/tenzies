import React, { useState } from 'react';
import { nanoid } from 'nanoid';
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

  const rollDice = () => {
    setDice((die) =>
      die.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  };

  const holdDice = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    );
  };

  return (
    <main className='main'>
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
        Roll
      </button>
    </main>
  );
};

export default App;
