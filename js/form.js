'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('input[name="address"]');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var inputs = adForm.querySelectorAll('input');

  // Сделать инпуты активными
  var enableFieldsets = function (fieldsetsArr) {
    for (var i = 0; i < fieldsetsArr.length; i++) {
      fieldsetsArr[i].removeAttribute('disabled', 'disabled');
    }
  };

  // Сделать инпуты неактивными
  var disableFieldsets = function (fieldsetsArr) {
    for (var i = 0; i < fieldsetsArr.length; i++) {
      fieldsetsArr[i].setAttribute('disabled', 'true');
    }
  };

  // Валидация. Поле с количеством гостей
  var roomsNumber = adForm.querySelector('#room_number');
  var guestsNumber = adForm.querySelector('#capacity');

  var validateGuestsNumber = function () {
    adForm.reportValidity();
    var validityMessage = 'В 1 комнате может расположиться только 1 гость.';

    if (roomsNumber.value < guestsNumber.value && roomsNumber.value !== '100') {
      validityMessage = 'В ' + roomsNumber.value + ' комнатах может располагаться до ' + roomsNumber.value + ' гостей.';
    } else if (roomsNumber.value !== '100' && guestsNumber.value === '0') {
      validityMessage = 'Укажите количество гостей';
    } else if (roomsNumber.value === '100' && guestsNumber.value !== '0') {
      validityMessage = '100 комнат - не для гостей';
    } else {
      validityMessage = '';
    }

    guestsNumber.setCustomValidity(validityMessage);
  };

  guestsNumber.addEventListener('change', validateGuestsNumber);

  window.form = {
    adForm: adForm,
    addressInput: addressInput,
    formFieldsets: formFieldsets,
    inputs: inputs,
    guestsNumber: guestsNumber,
    enableFieldsets: enableFieldsets,
    disableFieldsets: disableFieldsets,
    validateGuestsNumber: validateGuestsNumber
  };
})();
