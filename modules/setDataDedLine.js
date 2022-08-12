const getTimer = () => {
  const timerDiv = document.querySelector('.timer');
  timerDiv.setAttribute('style', 'background-color:brown');
  return timerDiv;
};


export const setDataDedline = () => {
  const timerDiv = getTimer();
  timerDiv.setAttribute('data-deadline', '2022/08/22 16:31 UTC+3');
  return timerDiv;
};
