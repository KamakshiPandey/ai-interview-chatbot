export const scoringPrompt = (question, answer) => `
You are an AI HR evaluator. Here's a question and an answer.

Question: ${question}

Answer: ${answer}

Evaluate the answer based on:
- Relevance
- Clarity
- Depth
- Communication Skills

Give a score out of 10, and detailed feedback in ~3 lines.
Return in this format:
Score: X/10
Feedback: ...
`;
