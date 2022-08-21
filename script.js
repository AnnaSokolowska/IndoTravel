import {setDataDedline} from './modules/setDataDedline.js';
import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import
{choose, choosePeople, chooseReservPeople, reservChoose,
  gettingTotalAmount, sendReservForm, sendFooterForm}
  from './modules/fetch.js';

const init = () => {
  const datadeadline = setDataDedline();
  const deadline = datadeadline.getAttribute('data-deadline');
  timer(`${deadline}`);
  choose();
  reservChoose();
  choosePeople();
  chooseReservPeople();
  gettingTotalAmount();
  sendReservForm();
  sendFooterForm();
};

init();
