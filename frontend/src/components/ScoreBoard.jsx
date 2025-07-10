import React from 'react';

const ScoreBoard = ({ score }) => {
  return (
    <div className="bg-blue-100 p-4 rounded mb-4">
      <h4 className="font-bold text-lg">Score:</h4>
      <p className="text-xl text-blue-800">{score}/10</p>
    </div>
  );
};

export default ScoreBoard;
