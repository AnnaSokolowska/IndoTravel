const inputSurname = document.getElementById('reservation__name');
const inputPhone = document.getElementById('reservation__phone');

export const surnameCheck = () => {
  inputSurname.addEventListener('input', () => {
    inputSurname.value = inputSurname.value.replace(/[^А-Я\s]/gi, '');
    return inputSurname;
  });
};

export const phoneCheck = () => {
  inputPhone.addEventListener('input', () => {
    inputPhone.value = inputPhone.value.replace(/[^+0-9]+/, '');
    return inputPhone;
  });
};

