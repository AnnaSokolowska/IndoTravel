import {setDataDedline} from './modules/setDataDedline.js';
import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import {renderTours,
  renderPersons,
  renderReservTours,
  renderReservPersons,
  getTotalAmount} from './modules/fetch.js';

const init = () => {
  const datadeadline = setDataDedline();
  const deadline = datadeadline.getAttribute('data-deadline');
  timer(`${deadline}`);
  renderTours();
  renderPersons();
  renderReservTours();
  renderReservPersons();
  getTotalAmount();
};

init();
