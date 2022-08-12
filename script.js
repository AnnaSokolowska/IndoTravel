import {setDataDedline} from './modules/setDataDedline.js';
import {timer} from './modules/timer.js';

const init = () => {
  const datadeadline = setDataDedline();
  const deadline = datadeadline.getAttribute('data-deadline');
  timer(`${deadline}`);
};

init();
