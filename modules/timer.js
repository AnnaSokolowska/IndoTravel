
const getHeroElements = () => {
  const heroText = document.querySelector('.hero__text');
  const heroTimer = document.querySelector('.hero__timer');
  return {heroText, heroTimer};
};

const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};


export const timer = deadline => {
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
    const secondes = Math.floor(timeRemainig / 1000 % 60);
    const minutes = Math.floor(timeRemainig / 1000 / 60 % 60);
    const hours = Math.floor(timeRemainig / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemainig / 1000 / 60 / 60 / 24);

    return {timeRemainig, days, minutes, hours, secondes};
  };
  const createSecondes = () => {
    const timerDiv = document.querySelector('.timer');
    const sec = document.createElement('p');
    sec.classList.add('timer__item', 'timer__item_secondes');
    sec.setAttribute('style', 'display:none');
    const spanCounts = document.createElement('span');
    spanCounts.classList.add('timer__count', 'timer__count_secondes');
    const spanUnits = document.createElement('span');
    spanUnits.classList.add('timer__units', 'timer__units_secondes');

    sec.append(spanCounts, spanUnits);
    timerDiv.append(sec);
    return {sec, spanCounts, spanUnits};
  };
  const {sec, spanCounts, spanUnits} = createSecondes();

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
    if (timer.secondes < 10) {
      spanCounts.textContent = `0${timer.secondes}`;
    } else spanCounts.textContent = timer.secondes;
    if (timer.days === 0) {
      const timerDiv = document.querySelector('.timer');
      timerDiv.setAttribute('style', 'background-color:green');
      const days = timerDiv.querySelector('.timer__item_days');
      days.setAttribute('style', 'display:none');
      sec.toggleAttribute('style');
    }

    const dayText = numWord(timer.days, ['день', 'дня', 'дней']);
    textDays.textContent = dayText;

    const hoursText = numWord(timer.hours, ['час', 'часа', 'часов']);
    textHours.textContent = hoursText;

    const minutesText = numWord(timer.minutes, ['минута', 'минуты', 'минут']);
    textMinutes.textContent = minutesText;

    const secondesText = numWord(
      timer.secondes, ['секунда', 'секунды', 'секунд']);
    spanUnits.textContent = secondesText;


    const interbalId = setTimeout(start, 1000);
    const {heroText, heroTimer} = getHeroElements();

    if (timer.timeRemainig <= 0) {
      clearTimeout(interbalId);
      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      heroText.setAttribute('style', 'display:none');
      heroTimer.setAttribute('style', 'display:none');
    }
  };

  start();
};
