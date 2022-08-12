'use strict';

const getDataTimer = () => {
  const element = document.querySelector('[data-timer-deadline]');
  return element;
};

const createTimerElements = () => {
  const result = getDataTimer();
  if (result !== null) {
    const timerTitle = document.createElement('p');
    timerTitle.classList.add('timer__title');
    timerTitle.textContent = 'До конца акции осталось:';

    const pDays = document.createElement('p');
    pDays.classList.add('timer__item', 'timer__item_days');
    const daysCount = document.createElement('span');
    daysCount.classList.add('timer__count', 'timer__count_days');
    const daysUnits = document.createElement('span');
    daysUnits.classList.add('timer__units', 'timer__units_days');
    pDays.append(daysCount, daysUnits);

    const pHours = document.createElement('p');
    pHours.classList.add('timer__item', 'timer__item_hours');
    const hoursCount = document.createElement('span');
    hoursCount.classList.add('timer__count', 'timer__count_hours');
    const hoursUnits = document.createElement('span');
    hoursUnits.classList.add('timer__units', 'timer__units_hours');
    pHours.append(hoursCount, hoursUnits);

    const pMinutes = document.createElement('p');
    pMinutes.classList.add('timer__item', 'timer__item_minutes');
    const minutesCount = document.createElement('span');
    minutesCount.classList.add('timer__count', 'timer__count_minutes');
    const minutesUnits = document.createElement('span');
    minutesUnits.classList.add('timer__units', 'timer__units_minutes');
    pMinutes.append(minutesCount, minutesUnits);

    return {timerTitle, pDays, pHours, pMinutes};
  }
};
const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};

const timer = () => {
  const result = getDataTimer();
  if (result !== null) {
    const {
      timerTitle,
      pDays, pHours, pMinutes} = createTimerElements();
    result.append(timerTitle, pDays, pHours, pMinutes);
  }
  const deadline = result.getAttribute(
    'data-timer-deadline');


  const timerDays = document.querySelector('.timer__count_days');
  const textDays = document.querySelector('.timer__units_days');

  const timerHours = document.querySelector('.timer__count_hours');
  const textHours = document.querySelector('.timer__units_hours');

  const timerMinutes = document.querySelector('.timer__count_minutes');
  const textMinutes = document.querySelector('.timer__units_minutes');

  const getTimeRemaining = () => {
    const dateStop = new Date(`${deadline}`).getTime();

    const dateNow = Date.now();
    const timeRemainig = dateStop - dateNow;
    const minutes = Math.floor(timeRemainig / 1000 / 60 % 60);
    const hours = Math.floor(timeRemainig / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemainig / 1000 / 60 / 60 / 24);

    return {timeRemainig, days, minutes, hours};
  };
  const start = () => {
    const timer = getTimeRemaining();
    if (timer.days < 10) {
      timerDays.textContent = `0${timer.days}`;
    } else timerDays.textContent = timer.days;
    if (timer.hours < 10) {
      timerHours.textContent = `0${timer.hours}`;
    } else timerHours.textContent = timer.hours;
    if (timer.minutes < 10) {
      timerMinutes.textContent = `0${timer.minutes}`;
    } else timerMinutes.textContent = timer.minutes;

    const dayText = numWord(timer.days, ['день', 'дня', 'дней']);
    textDays.textContent = dayText;

    const hoursText = numWord(timer.hours, ['час', 'часа', 'часов']);
    textHours.textContent = hoursText;

    const minutesText = numWord(timer.minutes, ['минута', 'минуты', 'минут']);
    textMinutes.textContent = minutesText;


    const interbalId = setTimeout(start, 1000);

    if (timer.timeRemainig <= 0) {
      clearTimeout(interbalId);
      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
    }
  };

  start();
};

timer();

