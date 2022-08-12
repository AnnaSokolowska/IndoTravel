const getTimer = () => {
  const timerDiv = document.querySelector('.timer');
  return timerDiv;
};


export const setDataDedline = () => {
  const timerDiv = getTimer();
  timerDiv.setAttribute('data-deadline', '2022/08/22 15:40');
  return timerDiv;
};
