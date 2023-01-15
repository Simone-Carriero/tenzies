import React, { useState, useEffect } from 'react';
import { generateNewDie, allNewDice } from './utils/dice';
import Die from './components/Die/Die';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import AllScores from './components/AllScores/AllScores';
import BrowserConfig from './components/BrowserConfig';

const App = () => {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [scores, setScores] = useState({
    seconds: 0,
    minutes: 0,
    rolls: 0,
  });

  const { width, height } = useWindowSize();

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
      setDice((prevDie) =>
        prevDie.map((die) => {
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

  // Create a message that displays the roll count and time spent with correct plural forms for minutes and seconds
  const timeMessage = `You rolls ${scores.rolls} times in ${
    scores.minutes > 0
      ? `${scores.minutes} ${scores.minutes > 1 ? 'minutes' : 'minute'} and ${
          scores.seconds
        } ${scores.seconds > 1 ? 'seconds' : 'second'}`
      : `${scores.seconds} seconds`
  }`;

  return (
    <main className='main'>
      <BrowserConfig />
      <section className='game-container'>
        {tenzies && (
          <Confetti
            width={width}
            height={height}
          />
        )}
        <section className='intro-section'>
          <h1 className='intro-section__title'>🎲 Tenzies</h1>
          <p className='intro-section__description'>
            {tenzies
              ? timeMessage
              : 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}
          </p>
        </section>

        <section className='score-section'>
          <h4 className='score-section__subtitle'>Your Time ⏰</h4>
          {/* Display time in 00:00 format leading 0 is added for minutes and seconds if they are less than 10 */}
          <p className='score-section__time'>
            {scores.minutes > 0 &&
              `${scores.minutes < 10 ? '0' : ''}${scores.minutes} : `}{' '}
            {scores.seconds < 10 ? '0' : ''}
            {scores.seconds}
          </p>
          {tenzies && <AllScores scores={scores} />}
        </section>

        <section className='dice-section'>
          <div className='dice-container'>
            {dice.map((die) => (
              <Die
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
              />
            ))}
          </div>

          <button
            type='button'
            className='btn'
            onClick={rollDice}>
            {tenzies ? 'New Game' : 'Roll'}
          </button>
        </section>
      </section>
    </main>
  );
};

export default App;
