import React from 'react';
import './Die.css';

const Die = ({ value, isHeld, holdDice }) => {
  return <div onClick={holdDice}>{value}</div>;
};

export default Die;
