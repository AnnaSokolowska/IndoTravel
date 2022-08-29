import loadStyle from './loadStyle.js';


const showMadl = async (reservDate, reservPeople, totalAmount, peoplesText) => {
  await loadStyle('/css/modal.css');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Подтверждение заявки';
  const personAmount = document.createElement('p');
  personAmount.classList.add('modal__text');
  personAmount.textContent =
    `Бронирование путешествия в Индию на ${reservPeople}${peoplesText}`;
  const dateTour = document.createElement('p');
  dateTour.classList.add('modal__text');
  dateTour.textContent = `В даты: ${reservDate}`;
  const tourAmount = document.createElement('p');
  tourAmount.classList.add('modal__text');
  tourAmount.textContent = `Стоимость тура ${totalAmount}`;
  const buttons = document.createElement('div');
  buttons.classList.add('modal__button');
  const btnConfirm = document.createElement('button');
  btnConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  btnConfirm.textContent = 'Подтверждаю';
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('modal__btn', 'moda__btn_edit');
  btnEdit.textContent = 'Изменить данные';
  buttons.append(btnConfirm, btnEdit);

  overlay.append(modal);
  modal.append(title, personAmount, dateTour, tourAmount, buttons);

  document.body.append(overlay);
  return new Promise(resolve => {
    btnEdit.addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    });

    btnConfirm.addEventListener('click', () => {
      overlay.remove();
      const reservSurname = document.getElementById('reservation__name').value;
      const fioCheck = /^(?:[а-я]+\s){2,}(?:[а-я]+\s*)$/iu;
      const goodChoice = reservSurname.match(fioCheck);

      if (goodChoice !== null) {
        resolve(true);
      } else {
        alert('Вы неверно заполнили ФИО, введите свои данные полностью');
      }
    });
  });
};
export default showMadl;
