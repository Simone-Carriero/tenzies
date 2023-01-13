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
  const [scores, setScores] = useState({
    seconds: 0,
    minutes: 0,
    rolls: 0,
  });

  // Start and stop the interval
  useEffect(() => {
    let intervalId;
    // if !tenzies start the interval
    if (!tenzies) {
      intervalId = setInterval(() => {
        // update the time state by incrementing seconds and minutes when needed
        setScores((prevScores) => {
          let newScores = { ...prevScores };
          newScores.seconds++;
          if (newScores.seconds === 60) {
            newScores.minutes++;
            newScores.seconds = 0;
          }
          return newScores;
        });
      }, 1000);
    } else {
      // if tenzies is true, stop the interval
      clearInterval(intervalId);
    }

    // Cleanup function to stop the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [tenzies, scores.seconds, scores.minutes]);

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
    if (!tenzies) {
      setDice((die) =>
        die.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setScores((prevScores) => ({
        ...prevScores,
        rolls: scores.rolls + 1,
      }));
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setScores({
        seconds: 0,
        minutes: 0,
        rolls: 0,
      });
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
          ? `You rolls ${scores.rolls} time in ${
              scores.minutes > 0
                ? `${scores.minutes} minutes and ${scores.seconds} seconds`
                : `${scores.seconds} seconds`
            }`
          : 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}
      </p>
      <section>
        <h4 className='subtitle'>Your Time</h4>
        <p className='time'>
          {scores.minutes > 0 &&
            `${scores.minutes < 10 ? '0' : ''}${scores.minutes} : `}{' '}
          {scores.seconds}
        </p>
      </section>
      <section className='dice-container'>
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
