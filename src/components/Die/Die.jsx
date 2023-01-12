import React from 'react';
import './Die.css';

const Die = ({ value, isHeld, holdDice }) => {
  return <div className={`die ${isHeld && 'die--selected'}`} onClick={holdDice}>
  {value}
  </div>;
};

export default Die;
