import { nanoid } from 'nanoid';

/* Functions for the dice */

/* Pick a random number from 1 to 6 */
const randomNumber = () => {
  return Math.ceil(Math.random() * 6);
};

/* Generate new dice object */
export const generateNewDie = () => ({
  value: randomNumber(),
  isHeld: false,
  id: nanoid(),
});

/* Create an array of 10 dice objects with a for loop */
export const allNewDice = () => {
  let newDice = [];
  for (let i = 0; i < 10; i++) {
    newDice.push(generateNewDie());
  }
  return newDice;
};
