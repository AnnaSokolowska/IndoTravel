import {setDataDedline} from './modules/setDataDedline.js';
import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';

const init = () => {
  const datadeadline = setDataDedline();
  const deadline = datadeadline.getAttribute('data-deadline');
  timer(`${deadline}`);
};

init();
