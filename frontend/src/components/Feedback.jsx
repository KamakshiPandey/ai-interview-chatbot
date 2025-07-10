import React from 'react';

const Feedback = ({ feedback }) => {
  return (
    <div className="bg-yellow-100 p-4 rounded mb-4">
      <h4 className="font-bold text-lg">Feedback:</h4>
      <p className="text-yellow-900">{feedback}</p>
    </div>
  );
};

export default Feedback;
