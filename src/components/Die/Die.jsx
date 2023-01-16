import React from 'react';
import './Die.css';

const Die = ({ value, isHeld, holdDice }) => {
  const styles = {
    background: {
      background: `url('dice/${value}.png') center center`,
      backgroundSize: 'cover',
    },
  };

  return (
    <div
      style={styles.background}
      className={`die ${isHeld && 'die--selected'}`}
      onClick={holdDice}></div>
  );
};

export default Die;
