fetch('db.json');

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


const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};

const loadTours = async () => {
  const result = await fetch('db.json');
  const data = await result.json();
  return data;
};


export const renderTours = async () => {
  const data = await loadTours();
  const dates = data.map(item => {
    const tourOption = document.createElement('option');
    tourOption.className = 'tour__option';
    tourOption.setAttribute('value', `${item.date}`);
    tourOption.textContent = tourOption.value;
    return tourOption;
  });
  select.append(...dates);
};

export const renderReservTours = async () => {
  const data = await loadTours();
  const dates = data.map(item => {
    const tourOption = document.createElement('option');
    tourOption.classList.add('tour__option', 'reservation__option');
    tourOption.setAttribute('value', `${item.date}`);
    tourOption.textContent = tourOption.value;
    return tourOption;
  });
  reservationSelect.append(...dates);
};

export const renderPersons = async () => {
  const data = await loadTours();
  select.addEventListener('change', () => {
    const personOptions = selectPerson.querySelectorAll('.tour__option');
    personOptions.forEach(item => {
      item.remove();
    });

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
  });
};

export const renderReservPersons = async () => {
  const data = await loadTours();
  reservationSelect.addEventListener('change', () => {
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
  });
};

export const getTotalAmount = async () => {
  const data = await loadTours();
  reservationPerson.addEventListener('change', () => {
    const tourDates = document.getElementById('reservation__date').value;
    const tourPerson = document.getElementById('reservation__people').value;
    const dataReserv = document.querySelector('.reservation__data');
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
  });
};


