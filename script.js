import {setDataDedline} from './modules/setDataDedline.js';
import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import
{choose, choosePeople, chooseReservPeople, reservChoose,
  gettingTotalAmount, sendReservForm, sendFooterForm}
  from './modules/fetch.js';
import {surnameCheck, phoneCheck} from './modules/regexp.js';
import JustValidate from 'just-validate';
import Inputmask from 'inputmask';
import Swiper, {Navigation} from 'swiper';

const inputTel = document.getElementById('reservation__phone');


const telMask = new Inputmask('+7 (999)-999-99-99');
telMask.mask(inputTel);
const validate = new JustValidate('.reservation__form');
validate
  .addField('.reservation__input_name', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваше имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Не короче трех символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинное имя',
    },
  ])
  .addField('.reservation__input_phone', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш телефон',
    },
    {
      validator(value) {
        const phone = inputTel.inputmask.unmaskedvalue();
        return !!(Number(phone) && phone.length === 10);
      },
      errorMessage: 'Телефон не корректный',
    },
  ]);

new Swiper('.swiper', {
  modules: [Navigation],
  navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
  },
  slidesPerView: 2,
});


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
  surnameCheck();
  phoneCheck();
};

init();
