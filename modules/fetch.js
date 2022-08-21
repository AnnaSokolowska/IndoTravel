const URL = '/db.json';

const select = document.querySelector('#tour__date');
const dateOption = select.querySelectorAll('.tour__option');
dateOption.forEach(item => {
  if (item.value !== '') {
    item.remove();
  }
});

const reservationSelect = document.querySelector('#reservation__date');
const dateReservation = reservationSelect.
  querySelectorAll('.reservation__option');
dateReservation.forEach(item => {
  if (item.value !== '') {
    item.remove();
  }
});

const selectPerson = document.querySelector('#tour__people');
selectPerson.firstElementChild.className = 'tour__option-text';
const personOptions = selectPerson.querySelectorAll('.tour__option');
personOptions.forEach(item => {
  item.remove();
});

const reservationPerson = document.querySelector('#reservation__people');
reservationPerson.firstElementChild.className = 'tour__option-text';
const personReservation = reservationPerson.
  querySelectorAll('.reservation__option');
personReservation.forEach(item => {
  item.remove();
});

const tourForm = document.querySelector('.tour__form');
const reservationForm = document.querySelector('.reservation__form');
const footerForm = document.querySelector('.footer__form');


const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};
const fetchRequest = async (url, {
  method = 'get',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};

const renderTours = (err, data) => {
  if (err) {
    console.warn(err, data);
    tourForm.textContent = 'Что -то пошло не так, попробуйте еще раз';
    return;
  }
  const dates = data.map(item => {
    const tourOption = document.createElement('option');
    tourOption.className = 'tour__option';
    tourOption.setAttribute('value', `${item.date}`);
    tourOption.textContent = tourOption.value;
    return tourOption;
  });
  select.append(...dates);
};

export const choose = () => {
  select.addEventListener('click', () => {
    const dateOption = select.querySelectorAll('.tour__option');
    dateOption.forEach(item => {
      if (item.value !== '') {
        item.remove();
      }
    });
    fetchRequest(URL, {
      method: 'get',
      callback: renderTours,
    });
  });
};


const renderReservTours = async (err, data) => {
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = err;
    reservationForm.textContent = err;
    return;
  }
  const dateReservation = reservationSelect.
    querySelectorAll('.reservation__option');
  dateReservation.forEach(item => {
    if (item.value !== '') {
      item.remove();
    }
  });
  const dates = data.map(item => {
    const tourOption = document.createElement('option');
    tourOption.classList.add('tour__option', 'reservation__option');
    tourOption.setAttribute('value', `${item.date}`);
    tourOption.textContent = tourOption.value;
    return tourOption;
  });
  reservationSelect.append(...dates);
};

export const reservChoose = () => {
  reservationSelect.addEventListener('click', () => {
    fetchRequest(URL, {
      method: 'get',
      callback: renderReservTours,
    });
  });
};

export const renderPersons = async (err, data) => {
  if (err) {
    console.warn(err, data);
    tourForm.textContent = 'Что -то пошло не так, попробуйте еще раз';
    return;
  }
  const tourDates = document.getElementById('tour__date').value;
  const persons = [];
  data.forEach(item => {
    if (item.date === tourDates) {
      const min = item['min-people'];
      const max = item['max-people'];
      for (let i = min; i <= max; i++) {
        const personOption = document.createElement('option');
        personOption.className = 'tour__option';
        personOption.setAttribute('value', `${i}`);
        personOption.textContent = personOption.value;
        persons.push(personOption);
      }
      console.log(persons);
      selectPerson.append(...persons);
    }
  });
};

export const choosePeople = () => {
  select.addEventListener('change', () => {
    const personOptions = selectPerson.querySelectorAll('.tour__option');
    personOptions.forEach(item => {
      item.remove();
    });
    fetchRequest(URL, {
      method: 'get',
      callback: renderPersons,
    });
  });
};

const renderReservPersons = (err, data) => {
  if (err) {
    console.warn(err, data);
    tourForm.textContent = 'Что -то пошло не так, попробуйте еще раз';
    return;
  }
  const personReservation = reservationPerson.
    querySelectorAll('.reservation__option');
  personReservation.forEach(item => {
    item.remove();
  });

  const tourDates = document.getElementById('reservation__date').value;
  const persons = [];
  data.forEach(item => {
    if (item.date === tourDates) {
      const min = item['min-people'];
      const max = item['max-people'];
      for (let i = min; i <= max; i++) {
        const personOption = document.createElement('option');
        personOption.classList.add('tour__option', 'reservation__option');
        personOption.setAttribute('value', `${i}`);
        personOption.textContent = personOption.value;
        persons.push(personOption);
      }
      reservationPerson.append(...persons);
    }
  });
};

export const chooseReservPeople = () => {
  reservationSelect.addEventListener('change', () => {
    fetchRequest(URL, {
      method: 'get',
      callback: renderReservPersons,
    });
  });
};

export const sendReservForm = () => {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reservDate =
    document.getElementById('reservation__date').value;
    const reservPeople =
    document.getElementById('reservation__people').value;
    const reservName =
    document.getElementById('reservation__name').value;
    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        title: reservDate,
        body: reservPeople,
      },
      callback(error, data) {
        if (error) {
          console.warn(error, data);
          reservationForm.textContent = 'Что-то пошло не так';
        } else {
          reservationForm.textContent =
        `Заявка на ${reservDate} от ${reservName} 
        принята. С вами свяжутся наши операторы`;
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export const sendFooterForm = () => {
  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const footerInput = document.querySelector('.footer__input').value;
    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        title: footerInput,
      },
      callback(error, data) {
        if (error) {
          console.warn(error, data);
          footerForm.textContent = 'Что-то пошло не так';
        } else {
          footerForm.innerHTML =
        `<h3> Ваша заявка успешно отправлена</h3>
        <p style='border: 2px solid red'>Наши менеджеры свяжутся с<br>
          вами  в течении 3-х рабочих дней</p>`;
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

const getTotalAmount = (err, data) => {
  const dataReserv = document.querySelector('.reservation__data');
  if (err) {
    console.warn(err, data);
    dataReserv.textContent = 'Что-то пошло не так, попробуйте еще раз';
    return;
  }
  const tourDates = document.getElementById('reservation__date').value;
  const tourPerson = document.getElementById('reservation__people').value;
  const peoplesText = numWord(tourPerson, ['человек', 'человека', 'человек']);
  dataReserv.textContent = '';
  const priceReserv = document.querySelector('.reservation__price');
  priceReserv.textContent = '₽';
  data.forEach(item => {
    if (item.date === tourDates) {
      const price = item.price;
      const totalPrice = price * tourPerson;
      priceReserv.textContent = `${totalPrice}₽`;
      dataReserv.textContent = `${tourDates}, ${tourPerson} ${peoplesText}`;
    }
  });
};

export const gettingTotalAmount = () => {
  reservationPerson.addEventListener('change', () => {
    fetchRequest(URL, {
      method: 'get',
      callback: getTotalAmount,
    });
  });
};


