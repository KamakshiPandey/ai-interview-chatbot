import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/interview';

// Ask a new interview question
export const ask = () => {
  return axios.post(`${BASE_URL}/ask`);
};

// Evaluate user's answer
export const evaluate = (answer) => {
  return axios.post(`${BASE_URL}/evaluate`, { answer });
};

// Get feedback based on score
export const feedback = (score) => {
  return axios.post(`${BASE_URL}/feedback`, { score });
};
