import React from 'react';

const QuestionCard = ({ question, answer, setAnswer, onNext }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded mb-4">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={4}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your response..."
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={onNext}
      >
        Submit & Next
      </button>
    </div>
  );
};

export default QuestionCard;
