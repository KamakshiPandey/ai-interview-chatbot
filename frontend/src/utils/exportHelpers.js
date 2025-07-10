export const exportToJSON = (data) => {
  const fileData = JSON.stringify(data, null, 2);
  const blob = new Blob([fileData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.download = 'interview_results.json';
  link.href = url;
  link.click();
};
