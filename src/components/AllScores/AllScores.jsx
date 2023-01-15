import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './AllScores.css';

const AllScores = ({ scores }) => {
  const [allScores, setAllScores] = useState(
    localStorage.getItem('scores')
      ? JSON.parse(localStorage.getItem('scores'))
      : []
  );
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(allScores));
  }, [allScores]);

  const addScore = (e) => {
    e.preventDefault();
    setAllScores((prevAllScores) => [
      ...prevAllScores,
      { id: nanoid(), name: inputRef.current.value, ...scores },
    ]);
    inputRef.current.value = '';
    setSubmitted(true);
  };

  // This comparison function makes a sum of the value of "minutes" multiplied by 60 (to convert it into seconds) with the value of "seconds" for both objects "a" and "b" that we are comparing, and subtracts them from each other. This way, items with a value less than minutes and total seconds will be sorted first in the array.
  const bestScores = allScores.sort(
    (a, b) => a.minutes * 60 + a.seconds - (b.minutes * 60 + b.seconds)
  );

  const top5Scores = bestScores
    .slice(0, 3)
    .map((score) => <li key={score.id}>{score.name}</li>);

  return (
    <div className='allScores'>
      <form
        onSubmit={addScore}
        className={`${submitted ? 'd-none' : ''}`}>
        <input
          type='text'
          name='playerName'
          placeholder='Add your name...'
          className='allScores__input'
          maxLength={4}
          ref={inputRef}
        />
      </form>
      <div className='allScores__top'>
        <h4 className='allScores__title'>🏆 Top 3 Scores:</h4>
        <ol className='allScores__list'>{top5Scores}</ol>
      </div>
    </div>
  );
};

export default AllScores;
